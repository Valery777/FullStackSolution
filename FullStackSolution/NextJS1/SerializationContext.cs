using NextJS1.Application.Common;
using NextJS1.Infrastructure.api.ml;
using System.Text.Json.Serialization;
using static NextJS1.Controllers.ChatController;

namespace NextJS1;

//[JsonSerializable(typeof(PriceResponse))]
//[JsonSerializable(typeof(StyleRequest))]
//[JsonSerializable(typeof(StyleResponse))]
//[JsonSerializable(typeof(ChatRequest))]
//[JsonSerializable(typeof(ChatResponse))]
//[JsonSerializable(typeof(ErrorResponse))]
//[JsonSerializable(typeof(ProductDto))]
//[JsonSerializable(typeof(DeleteProductResponse))]
//[JsonSerializable(typeof(HousingData))]
//[JsonSerializable(typeof(HousingPrediction))]
[JsonSerializable(typeof(ChatMessageDto))]
[JsonSerializable(typeof(ChatRequestDto))]
public partial class AppJsonContext : JsonSerializerContext
{
}