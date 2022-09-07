using act.API.Tests.Controllers;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Repositories.GraphQL;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace act.API.Tests.Services;

/// <summary>
/// Test basic interaction repo.
/// </summary>
[TestClass]
public class RelationRepoUpdateTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly ActDbContext _dbContext;

    public RelationRepoUpdateTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<ActDbContext>();
    }

    [TestMethod]
    public async Task Create_Any_Relations()
    {
    }

    [TestMethod]
    public async Task Interaction_With_Different_Relations_Should_Work()
    {
    }
}