using Microsoft.ML.Data;
namespace NextJS1.Infrastructure.api.ml.TextClassification
{
    public class InputData
    {
        [LoadColumn(0)]
        public string Text { get; set; }

        [LoadColumn(1)]
        public string Label { get; set; }
    }
}
