using System.IO;
using act.API.Common.Settings;
using act.IoC.Configuration.DI;
using act.Repositories;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Repositories.GraphQL;
using act.Tools.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace act.API.Tests.Controllers;

[TestClass]
public class TestBase
{
    internal IConfigurationRoot _configurationRoot;
    protected internal ServiceProvider _serviceProvider;
    internal ServiceCollection _services;

    public TestBase()
    {
        _configurationRoot = ConfigurationHelper.GetIConfigurationRoot(Directory.GetCurrentDirectory());
        var appSettings = _configurationRoot.GetSection(nameof(AppSettings));

        _services = new ServiceCollection();


        JsonConvert.DefaultSettings = () => new JsonSerializerSettings
        {
            Formatting = Formatting.Indented,
            NullValueHandling = NullValueHandling.Ignore,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        _services.AddDbContext<ActDbContext>();
        _services.AddScoped<IInteractionRepository, InteractionRepository>();
        _services.AddScoped<IRelationRepository, RelationRepository>();
        _services.AddScoped<IGraphQLMutation, GraphQLMutation>();

        //We load EXACTLY the same settings (DI and others) than API real solution, what is much better for tests.
        _services.ConfigureBusinessServices(_configurationRoot);

        _services.ConfigureMappings();
        _services.AddLogging();
        _services.Configure<AppSettings>(appSettings);

        _serviceProvider = _services.BuildServiceProvider();
    }

    ~TestBase()
    {
        if (_serviceProvider != null)
            _serviceProvider.Dispose();
    }
}