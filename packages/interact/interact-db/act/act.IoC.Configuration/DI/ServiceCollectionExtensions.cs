using System.Reflection;
using act.Services;
using act.Services.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace act.IoC.Configuration.DI;

public static class ServiceCollectionExtensions
{
    public static void ConfigureBusinessServices(this IServiceCollection services, IConfiguration configuration)
    {
        if (services != null) services.AddTransient<IInteractionService, InteractionService>();
    }

    public static void ConfigureMappings(this IServiceCollection services)
    {
        if (services != null)
            //Automap settings
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }
}
