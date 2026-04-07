using Microsoft.ML.Data;

namespace NextJS1.Infrastructure.api.ml.SentimentAnalyzer
{
    public class SentimentInput
    {
        [LoadColumn(0)]
        public string Text { get; set; }

        [LoadColumn(1)]
        public bool Label { get; set; }   // MUST be bool
    }
}
