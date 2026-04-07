namespace NextJS1.Infrastructure.api.ml.HousingPrediction
{
    public static class ExplanationBuilder
    {
        public static string Build(HousingData d, float price)
        {
            var c = FeatureContribution.Compute(d);
            var reasons = new List<string>();

            // Size
            if (c["Size"] > 20) reasons.Add("the property is significantly larger than average");
            else if (c["Size"] > 0) reasons.Add("the property is slightly larger than average");
            else reasons.Add("the property is smaller than average");

            // Rooms
            if (c["Rooms"] > 1) reasons.Add("it has more rooms than typical homes");
            else if (c["Rooms"] == 0) reasons.Add("it has a standard number of rooms");
            else reasons.Add("it has fewer rooms than average");

            // Age
            if (c["Age"] > 10) reasons.Add("the building is very new");
            else if (c["Age"] > 0) reasons.Add("the building is newer than average");
            else reasons.Add("the building is older than average");

            // Location
            if (c["LocationScore"] > 2) reasons.Add("the location score is excellent");
            else if (c["LocationScore"] > 0) reasons.Add("the location score is above average");
            else reasons.Add("the location score is below average");

            return $"The predicted price of {price:N0} USD is influenced because " +
                   $"{string.Join(", ", reasons)}.";
        }
    }
}
