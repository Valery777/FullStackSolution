using Microsoft.ML;

namespace NextJS1.Infrastructure.api.ml.HousingPrediction
{
    public class HousingModel
    {
        #region Fields & Constructor

        private readonly ILogger<HousingModel> _logger;
        private readonly IConfiguration _config;
        private readonly PredictionEngine<HousingData, HousingPrediction> _engine;

        public HousingModel(ILogger<HousingModel> logger, IConfiguration config)
        {
            try
            {
                _logger = logger;
                _config = config;

                _logger.LogInformation("Loading ML Housing model...");

                var ml = new MLContext();

                string dataPath = _config["ML:HousingDataPath"];

                var data = ml.Data.LoadFromTextFile<HousingData>(
                    dataPath,
                    hasHeader: true,
                    separatorChar: ',');

                var pipeline = ml.Transforms.CopyColumns("Label", nameof(HousingData.Price))
                    .Append(ml.Transforms.Concatenate(
                        "Features",
                        nameof(HousingData.Size),
                        nameof(HousingData.Rooms),
                        nameof(HousingData.Age),
                        nameof(HousingData.LocationScore)))
                    .Append(ml.Regression.Trainers.FastTree());

                var model = pipeline.Fit(data);

                _engine = ml.Model.CreatePredictionEngine<HousingData, HousingPrediction>(model);

                _logger.LogInformation("ML Housing model loaded successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ML Housing model failed to load.");
            }
        }

        #endregion

        #region Prediction

        public float Predict(HousingData input)
        {
            return _engine.Predict(input).PredictedPrice;
        }

        #endregion
    }
}