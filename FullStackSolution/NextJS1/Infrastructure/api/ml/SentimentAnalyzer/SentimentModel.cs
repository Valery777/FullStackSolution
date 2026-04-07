using Microsoft.ML;
using Microsoft.ML.Data;
using NextJS1.Infrastructure.api.ml.SentimentAnalyzer;

namespace NextJS1.Infrastructure.api.ml.Sentiment
{
    public class SentimentModel
    {
        #region Fields & Constructor

        private readonly MLContext _ml;
        private readonly ILogger<SentimentModel> _logger;
        private readonly IConfiguration _config;

        public SentimentModel(ILogger<SentimentModel> logger, IConfiguration config)
        {
            _ml = new MLContext();
            _logger = logger;
            _config = config;
        }

        #endregion

        #region Training

        public void Train()
        {
            try
            {
                _logger.LogInformation("Loading ML Sentiment model...");

                string dataPath = _config["ML:SentimentDataPath"];
                string zipDataPath = _config["ML:SentimentModelZip"];

                var data = _ml.Data.LoadFromTextFile<SentimentInput>(
                    dataPath,
                    hasHeader: true,
                    separatorChar: ',');

                var pipeline = _ml.Transforms.Text.FeaturizeText("Features", nameof(SentimentInput.Text))
                    .Append(_ml.BinaryClassification.Trainers.LdSvm());

                // Alternative trainer:
                // .Append(_ml.BinaryClassification.Trainers.SdcaLogisticRegression());

                var model = pipeline.Fit(data);

                _ml.Model.Save(model, data.Schema, zipDataPath);

                _logger.LogInformation("ML Sentiment model trained and saved successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ML Sentiment model training failed.");
            }
        }

        #endregion
    }
}