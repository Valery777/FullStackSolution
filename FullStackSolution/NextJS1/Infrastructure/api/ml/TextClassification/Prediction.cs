using Microsoft.ML.Data;
namespace NextJS1.Infrastructure.api.ml.TextClassification
{
    public class Prediction
    {
        [ColumnName("PredictedLabel")]
        public string PredictedLabel { get; set; }
    }
}
