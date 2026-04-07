namespace NextJS1.Application.Common
{
    public static class DateTimeExtansions
    {
        public static string ToUsFormat(this DateTime dateTime)
        => dateTime.ToString("MM/dd/yyyy HH:mm:ss");

        public static string ToEuropeanFormat(this DateTime dateTime)
            => dateTime.ToString("dd/MM/yyyy HH:mm:ss");

        public static string ToIsoFormat(this DateTime dateTime)
            => dateTime.ToString("yyyy-MM-ddTHH:mm:ss");
        public static string ToUtcFormatted(this DateTime dateTime)
        {
            return dateTime.ToUniversalTime().ToString("MM/dd/yyyy HH:mm:ss");
        }



    }
}
