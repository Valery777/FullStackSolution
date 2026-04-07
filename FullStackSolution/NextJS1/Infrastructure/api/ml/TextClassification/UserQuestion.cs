namespace NextJS1.Infrastructure.api.ml.TextClassification
{
    public class UserQuestion
    {
        public string Question { get; set; }
    }
    public class TextClassificationResponse
    {
        public string Category { get; set; }
        public string Explanation { get; set; }
    }
}
