using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ML;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NextJS1;
using NextJS1.Application.Common;
using NextJS1.Application.Common.Interfaces;
using NextJS1.Infrastructure.api.llm.StyleTransformer;
using NextJS1.Infrastructure.api.ml.HousingPrediction;
using NextJS1.Infrastructure.api.ml.Sentiment;
using NextJS1.Infrastructure.api.ml.SentimentAnalyzer;
using NextJS1.Infrastructure.api.ml.TextClassification;
using NextJS1.Infrastructure.api.openAI;
using NextJS1.Infrastructure.Auth;
using NextJS1.Infrastructure.Persistence;
using NextJS1.Infrastructure.Settings;
using OpenAI;
using OpenAI.Chat;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

#region Logging
builder.Host.UseSerilog((ctx, lc) => lc.ReadFrom.Configuration(ctx.Configuration));
#endregion

#region Configuration & Settings
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection(nameof(JwtSettings)));
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
builder.Services.Configure<LocalSettings>(builder.Configuration.GetSection("LocalSettings"));
var localSettings = builder.Configuration.GetSection("LocalSettings").Get<LocalSettings>()!;
#endregion

#region Authentication & Authorization
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
        };
    });

builder.Services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
#endregion

#region Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connection, ServerVersion.AutoDetect(connection)));
#endregion

#region Controllers & JSON
builder.Services.AddControllers();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonContext.Default);
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});
#endregion

#region Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "NextJS1 Project API",
        Version = "v1",
        Description = "A management service for handling basic operations"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Enter JWT token: Bearer {your token}",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
#endregion

#region OpenAI Client
var apiKey = builder.Configuration["OpenAI:ApiKey"];
var openAiClient = new OpenAIClient(apiKey);
builder.Services.AddSingleton(new OpenAIClient(apiKey));
builder.Services.AddSingleton<LocalLlmClient>();
#endregion

#region ML Models
builder.Services.AddSingleton<HousingModel>();
builder.Services.AddSingleton<SentimentModel>();
builder.Services.AddSingleton<TextClassificationModel>();

builder.Services.AddPredictionEnginePool<InputData, Prediction>()
    .FromFile("learning_model.zip");

builder.Services.AddPredictionEnginePool<SentimentInput, SentimentPrediction>()
    .FromFile("sentiment_model.zip");
#endregion

var app = builder.Build();

#region Middleware
app.UseCors(policy =>
    policy.WithOrigins(localSettings.Url)
          .AllowAnyHeader()
          .AllowAnyMethod());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
#endregion

#region Controllers
app.MapControllers();
#endregion

#region Endpoints - Chat
//app.MapPost("/api/chat", async (OpenAIClient client, ChatRequest request) =>
//{
//    if (request == null || string.IsNullOrWhiteSpace(request.Message))
//        return Results.BadRequest(new { error = "Message is required." });
//    var chat = client.GetChatClient("gpt-4o-mini");

//    var result = await chat.CompleteChatAsync(
//        ChatMessage.CreateSystemMessage("You are a helpful assistant."),
//        ChatMessage.CreateUserMessage(request.Message)
//    );

//    var reply = string.Join(" ",
//        result.Value.Content
//            .Where(p => p.Kind == ChatMessageContentPartKind.Text)
//            .Select(p => p.Text)
//    );

//    return Results.Ok(new { reply });
//});
#endregion

#region Endpoints - Housing Price Prediction
app.MapPost("/api/ml/price", (HousingData req, HousingModel model) =>
{
    float price = 0;
    string explanation = "properties entered incorrectly";

    if (req.Size >= 10 && req.Size <= 2000 &&
        req.Rooms >= 1 && req.Rooms <= 10 &&
        req.Age >= 0 && req.Age <= 100 &&
        req.LocationScore >= 1 && req.LocationScore <= 10)
    {
        price = model.Predict(req);
        explanation = ExplanationBuilder.Build(req, price);
    }

    return new PriceResponse
    {
        Price = price,
        Explanation = explanation
    };
});
#endregion

#region Endpoints - Style Transformer
app.MapPost("/api/llm/style", async (LocalLlmClient llm, StyleRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Text) || string.IsNullOrWhiteSpace(req.Style))
        return Results.BadRequest("Text and style are required.");

    var result = await llm.RewriteAsync(req.Text, req.Style);
    return Results.Ok(new StyleResponse(result));
});
#endregion

#region Endpoints - Text Classification
app.MapPost("/api/ml/classify", (UserQuestion req, PredictionEnginePool<InputData, Prediction> pool) =>
{
    string category = pool.Predict(new InputData { Text = req.Question }).PredictedLabel;
    string explanation = category != "Unknown"
        ? TextClassificationExplanationBuilder.Build(category)
        : "I don't know this category yet.";

    return new TextClassificationResponse
    {
        Category = category,
        Explanation = explanation
    };
});
#endregion

#region Endpoints - Sentiment Analysis
app.MapPost("/api/ml/sentiment",
    (UserText req, PredictionEnginePool<SentimentInput, SentimentPrediction> pool) =>
    {
        var prediction = pool.Predict(new SentimentInput { Text = req.Text });
        float confidence = 1 / (1 + MathF.Exp(-prediction.Score));

        return Results.Json(new
        {
            sentiment = prediction.Sentiment,
            confidence = confidence
        });
    });
#endregion

app.Run();

