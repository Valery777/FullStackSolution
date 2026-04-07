using Microsoft.Extensions.Options;
using NextJS1;
using NextJS1.Application.Common;
using NextJS1.Controllers;
using Serilog;
using System.Text;
using System.Text.Json;

public class LocalLlmClient
{
    #region Fields & Constructor

    private readonly HttpClient _http = new HttpClient();
    private readonly ILogger<ChatController> _logger;
    private readonly IOptions<LocalSettings> _settings;

    public LocalLlmClient(IOptions<LocalSettings> options, ILogger<ChatController> logger)
    {
        _settings = options;
        _logger = logger;
    }

    #endregion

    #region Public Methods

    public async Task<string> AskAsync(string prompt)
    {
        try
        {
            _logger.LogInformation("LocalLlmClient AskAsync started.");

            string llmModel = _settings.Value.ollamoModel;
            string llmUrl = _settings.Value.llmUrl;

            var request = new ChatRequestDto(
                llmModel,
                new[] { new ChatMessageDto("user", prompt) },
                false
            );

            var res = await _http.PostAsJsonAsync(
                llmUrl + "/api/chat",
                request,
                AppJsonContext.Default.ChatRequestDto
            );

            if (!res.IsSuccessStatusCode)
            {
                var err = await res.Content.ReadAsStringAsync();
                _logger.LogError($"LocalLlmClient AskAsync Request failed: {res.StatusCode} - {err}");
                return $"Request failed: {res.StatusCode} - {err}";
            }

            using var stream = await res.Content.ReadAsStreamAsync();
            using var reader = new StreamReader(stream);

            var finalText = new StringBuilder();

            while (!reader.EndOfStream)
            {
                var line = await reader.ReadLineAsync();
                if (string.IsNullOrWhiteSpace(line))
                    continue;

                using var doc = JsonDocument.Parse(line);
                var root = doc.RootElement;

                if (root.TryGetProperty("message", out var msgElem) &&
                    msgElem.TryGetProperty("content", out var contentElem))
                {
                    finalText.Append(contentElem.GetString());
                }
            }

            _logger.LogInformation($"LocalLlmClient AskAsync ended. finalText: {finalText}");
            return finalText.ToString();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "LocalLlmClient AskAsync failed.");
            return $"Error: {ex.Message}";
        }
    }

    public async Task<string> RewriteAsync(string text, string style)
    {
        try
        {
            _logger.LogInformation("LocalLlmClient RewriteAsync started.");

            var prompt =
                $@"Rewrite the text below in a {style} style.
⚠️ IMPORTANT RULES:
- Output ONLY the rewritten text.
- Do NOT explain the changes.
- Do NOT describe the style.
- Do NOT include quotes.
- Do NOT add commentary.
- Do NOT add headings like 'Revised Text'.
TEXT TO REWRITE:{text}";

            return await AskAsync(prompt);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "LocalLlmClient RewriteAsync failed.");
            return $"Error: {ex.Message}";
        }
    }

    #endregion
}