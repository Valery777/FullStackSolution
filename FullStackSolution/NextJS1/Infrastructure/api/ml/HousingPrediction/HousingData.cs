using Microsoft.ML.Data;
namespace NextJS1.Infrastructure.api.ml.HousingPrediction
{
    public class HousingData
    {
        [LoadColumn(0)] public float Size { get; set; }
        [LoadColumn(1)] public float Rooms { get; set; }
        [LoadColumn(2)] public float Age { get; set; }
        [LoadColumn(3)] public float LocationScore { get; set; }
        [LoadColumn(4)] public float Price { get; set; }
    }

    public class HousingPrediction
    {
        [ColumnName("Score")]
        public float PredictedPrice { get; set; }
    }
    public class PriceResponse
    {
        public float Price { get; set; }
        public string Explanation { get; set; }
    }
}
