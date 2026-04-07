using Microsoft.ML;
using Microsoft.ML.Data;
using NextJS1.Infrastructure.api.ml.Sentiment;

namespace NextJS1.Infrastructure.api.ml.TextClassification
{
    public class TextClassificationModel
    {
        #region Fields & Constructor

        private readonly MLContext _ml;
        private readonly ILogger<TextClassificationModel> _logger;
        private readonly IConfiguration _config;

        public TextClassificationModel(ILogger<TextClassificationModel> logger, IConfiguration config)
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
                _logger.LogInformation("Loading ML TextClassification model...");

                string dataPath = _config["ML:TextClassificationPath"];
                string zipDataPath = _config["ML:learning_model.zip"];

                var data = _ml.Data.LoadFromTextFile<InputData>(
                    dataPath,
                    hasHeader: true,
                    separatorChar: ',');

                var pipeline = _ml.Transforms.Text.FeaturizeText("Features", nameof(InputData.Text))
                    .Append(_ml.Transforms.Conversion.MapValueToKey("Label"))
                    .Append(_ml.MulticlassClassification.Trainers.SdcaMaximumEntropy())
                    .Append(_ml.Transforms.Conversion.MapKeyToValue("PredictedLabel"));

                var model = pipeline.Fit(data);

                _ml.Model.Save(model, data.Schema, zipDataPath);

                _logger.LogInformation("ML TextClassification model trained and saved successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ML TextClassification model training failed.");
            }
        }

        #endregion
    }
}