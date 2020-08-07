using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Configuration;
using Serilog;

namespace TestLibraryNewVersion
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .WriteTo.RollingFile("Logs/myapp-{Date}.txt", outputTemplate: "{Timestamp:G} [{Level}] {ActionName} {Message}{NewLine:1}{Exception:1}")
                .WriteTo.RollingFile(new Serilog.Formatting.Json.JsonFormatter(), "Logs/myapp-{Date}.json")
                .CreateLogger();

            Log.Information("App starting up");
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseSerilog()
                .UseStartup<Startup>();
    }
}
