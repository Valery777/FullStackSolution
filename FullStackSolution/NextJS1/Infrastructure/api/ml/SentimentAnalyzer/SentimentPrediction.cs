using Microsoft.ML.Data;

namespace NextJS1.Infrastructure.api.ml.SentimentAnalyzer
{
    public class SentimentPrediction
    {
        [ColumnName("PredictedLabel")]
        public bool Sentiment { get; set; }

        public float Score { get; set; }
    }
}
