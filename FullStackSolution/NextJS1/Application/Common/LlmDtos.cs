namespace NextJS1.Application.Common
{
    public record ChatMessageDto(string Role, string Content);
    public record ChatRequestDto( string Model,ChatMessageDto[] Messages,bool Stream);
 
}
