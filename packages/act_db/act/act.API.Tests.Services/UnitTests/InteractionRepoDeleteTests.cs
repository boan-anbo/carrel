using act.API.Tests.Controllers;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Repositories.GraphQL;
using act.Services.Contracts;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace act.API.Tests.Services;

/// <summary>
/// Test basic interaction repo.
/// </summary>
[TestClass]
public class InteractionRepoDeleteTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly InteractDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public InteractionRepoDeleteTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();

        _dbContext = _serviceProvider.GetRequiredService<InteractDbContext>();
    }

    // test delete interaction
    [TestMethod]
    public async Task Delete_Interaction_Should_Work()
    {
        // empty interaction dto
        var interactionDto = new CreateOrUpdateInteractionRequestDto("Test_Interaction"
        );

        // create interaction
        var interaction =
            await _mutationService.CreateOrUpdateInteraction(
                _interactionRepo, 
                _interactionService,
                _relationRepo, _dbContext, interactionDto);

        // retrieved interaction
        var retrievedInteraction = await _interactionRepo.GetInteractionFull(interaction.Id);

        Assert.IsNotNull(retrievedInteraction);

        // delete interaction
        await _mutationService.DeleteInteraction(interaction.Id, _interactionRepo);

        // retrieved interaction
        var interactionAfterDelete = await _interactionRepo.GetInteractionFull(interaction.Id);

        Assert.IsNull(interactionAfterDelete);

        // check if interaction is deleted from db
        var interactionFromDb = await _dbContext.Interactions.FirstOrDefaultAsync(i => i.Id == interaction.Id);

        Assert.IsNull(interactionFromDb);

        // make sure that all relations are deleted
        var relationsFromDb = await _dbContext.FirstActRelations.Where(r => r.HostInteractionId == interaction.Id)
            .ToListAsync();

        Assert.IsTrue(relationsFromDb.Count == 0);

        // make sure the first act is NOT deleted

        // retrieved act
        var act = await _interactionRepo.GetInteractionFull(1);

        Assert.IsNotNull(act);
        Assert.AreEqual("to be", act.Label);
    }

    // test delete all relations when interaction is deleted
    [TestMethod]
    public async Task Delete_Interaction_Should_Delete_All_Relations()
    {
        // empty interaction dto
        var interactionDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Test_Interaction",
            SecondActDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto
                {
                    Label = "Test_Second_Act_Relation",
                    RelationType = RelationTypes.SecondActRelation,
                    LinkedInteractionId = 1,
                }
            }
        };

        // // create interaction
        // var interaction =
        await _mutationService.CreateOrUpdateInteraction(_interactionRepo, 
            _interactionService, 
            _relationRepo, _dbContext, interactionDto);
        //
        // // retrieved interaction
        // var retrievedInteraction = await _interactionRepo.GetInteractionFull(interaction.Id);
        //
        // Assert.IsNotNull(retrievedInteraction);
        //
        // // check first second acts is created
        // var firstSecondAct = retrievedInteraction.SecondActs.FirstOrDefault();
        //
        // Assert.IsNotNull(firstSecondAct);
    }
}