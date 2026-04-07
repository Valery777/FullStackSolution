using NextJS1.Infrastructure.api.ml.HousingPrediction;

namespace NextJS1.Infrastructure.api.ml.TextClassification
{
    public static class TextClassificationExplanationBuilder
    {
        public static string Build(string category)
        {
            return category switch
            {
                "Math" => "This is a math question. Here is how to solve it..." ,
                "History" => "This is a history question. Here is the explanation..." ,
                "Programming" => "This is a programming question. Here is an example..." ,
                _ =>  "I don't know this category yet." 
            };
        }
    }
}
