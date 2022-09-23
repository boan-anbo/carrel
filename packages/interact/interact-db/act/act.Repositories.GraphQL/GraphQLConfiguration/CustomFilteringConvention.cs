using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language;

namespace act.Repositories.GraphQL.GraphQLConfiguration

{
    public class CustomFilteringConvention : FilterConvention
    {
        protected override void Configure(IFilterConventionDescriptor descriptor)
        {
            descriptor.AddDefaults();
            // descriptor.Operation(DefaultFilterOperations.Equals).Name("equals");
            descriptor.AddProviderExtension(
                new QueryableFilterProviderExtension(
                    x => x.AddFieldHandler<QueryableStringInvariantContainsHandler>()));
        }
    }

    public class QueryableStringInvariantContainsHandler : QueryableStringOperationHandler
    {
        public QueryableStringInvariantContainsHandler(InputParser inputParser) : base(inputParser) { }

        protected override int Operation => DefaultFilterOperations.Contains;
        public override Expression HandleOperation(QueryableFilterContext context, IFilterOperationField field, IValueNode value, object parsedValue)
        {
            Expression property = context.GetInstance();
            if (parsedValue is string str)
            {
                var toLower = Expression.Call(property, typeof(string).GetMethod("ToLower", Type.EmptyTypes));
                return Expression.Call(toLower, typeof(string).GetMethod(nameof(string.Contains), new Type[] { typeof(string) }), Expression.Constant(str.ToLower()));
            }
            throw new InvalidOperationException();
        }
    }
}
