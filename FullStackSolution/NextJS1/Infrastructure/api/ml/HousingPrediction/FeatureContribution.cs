namespace NextJS1.Infrastructure.api.ml.HousingPrediction
{
    public class FeatureContribution
    {
        public static Dictionary<string, float> Compute(HousingData d)
        {
            // These averages come from your synthetic dataset
            const float avgSize = 110;
            const float avgRooms = 3;
            const float avgAge = 15;
            const float avgLocation = 6;

            return new Dictionary<string, float>
            {
                ["Size"] = d.Size - avgSize,
                ["Rooms"] = d.Rooms - avgRooms,
                ["Age"] = avgAge - d.Age, // lower age = higher price
                ["LocationScore"] = d.LocationScore - avgLocation
            };
        }
    }

}
