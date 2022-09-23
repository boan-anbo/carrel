using System;
using System.Linq;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace act.API.Common.Attributes;

/// <summary>
///     Represents the Swagger/Swashbuckle operation filter used to document the implicit API version parameter.
/// </summary>
/// <remarks>
///     This <see cref="IOperationFilter" /> is only required due to bugs in the <see cref="SwaggerGenerator" />.
///     Once they are fixed and published, this class can be removed.
/// </remarks>
public class SwaggerDefaultValues : IOperationFilter
{
    /// <summary>
    ///     Applies the filter to the specified operation using the given context.
    /// </summary>
    /// <param name="operation">The operation to apply the filter to.</param>
    /// <param name="context">The current operation filter context.</param>
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.Parameters == null) return;

        var apiDescription = context.ApiDescription;

        if (apiDescription.TryGetMethodInfo(out var methodInfo))
            if (methodInfo.CustomAttributes != null)
            {
                operation.Deprecated |= methodInfo.CustomAttributes.OfType<ObsoleteAttribute>().Any();

                // REF: https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/412
                // REF: https://github.com/domaindrivendev/Swashbuckle.AspNetCore/pull/413
                foreach (var parameter in operation.Parameters)
                {
                    var description = apiDescription.ParameterDescriptions.First(p => p.Name == parameter.Name);

                    if (parameter.Description == null) parameter.Description = description.ModelMetadata?.Description;

                    parameter.Required |= description.IsRequired;
                }
            }
    }
}
