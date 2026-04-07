
using Amazon.Lambda.AspNetCoreServer;
using Microsoft.AspNetCore.Hosting;


namespace NextJS1
{
    public class LambdaEntryPoint : APIGatewayProxyFunction
    {
        protected override void Init(IWebHostBuilder builder)
        {
            // For .NET 8 minimal hosting
            builder.UseSetting(WebHostDefaults.ApplicationKey, "NextJS1");
        }
    }



}
