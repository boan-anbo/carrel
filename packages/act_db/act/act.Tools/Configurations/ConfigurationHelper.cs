using System.IO;
using Microsoft.Extensions.Configuration;

namespace act.Tools.Configurations;

public static class ConfigurationHelper
{
    public static IConfigurationRoot GetIConfigurationRoot(string outputPath)
    {
        var configurationBuilder = new ConfigurationBuilder()
            .SetBasePath(!string.IsNullOrEmpty(outputPath) ? outputPath : Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", false, true)
            .AddEnvironmentVariables();

        return configurationBuilder.Build();
    }

    public static IConfigurationRoot GetIConfigurationRoot(string environment, string outputPath)
    {
        return new ConfigurationBuilder()
            .SetBasePath(!string.IsNullOrEmpty(outputPath) ? outputPath : Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", false, true)
            .AddJsonFile($"appsettings.{environment}.json", false, true)
            .AddEnvironmentVariables()
            .Build();
    }

    public static T GetApplicationConfiguration<T>(string outputPath, IConfigurationRoot iConfig)
    {
        var configuration = default(T);

        iConfig?
            .GetSection(typeof(T).Name)?
            .Bind(configuration);

        return configuration;
    }

    public static IConfigurationSection GetConfigurationSection<T>(IConfigurationRoot iConfig)
    {
        return iConfig?.GetSection(typeof(T).Name);
    }
}