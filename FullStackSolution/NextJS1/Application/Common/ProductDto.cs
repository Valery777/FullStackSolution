namespace NextJS1.Application.Common
{
    public record ProductDto(
    int id,
    string name,
    decimal price,
    string type,
    string description,
    int quantity,
    string category,
    DateTime createDate,
    DateTime updateDate
);

    public record DeleteProductResponse(string Message, int Id);
}
