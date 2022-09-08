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
public class InteractionRepoTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly ActDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public InteractionRepoTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
        _dbContext = _serviceProvider.GetRequiredService<ActDbContext>();
    }

    [TestMethod]
    public async Task Should_Create_Interaction_By_Label_And_Identity()

    {
        const string label = "test";
        var identity = InteractionIdentity.SOURCE;
        var interaction = await _mutationService.AddNewEntityInteraction(
            _interactionRepo,
            _relationRepo,
            label,
            InteractionIdentity.SOURCE
        );
        Assert.IsNotNull(interaction);
        Assert.AreEqual(label, interaction.Label);
        Assert.AreEqual(identity, interaction.Identity);
    }

    [TestMethod]
    public async Task TestCreateInteraction()
    {
        var createOrUpdateDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = null,
            Uuid = null,
            Label = "Test_Old",
            Description = null,
            Content = null,
            Start = null,
            End = null,
            Data = null,
            ContextDtos = null,
            SubjectDtos = null,
            FirstActDtos = null,
            ObjectDtos = null,
            SecondActDtos = null,
            ParallelDtos = null,
            IndirectObjectDtos = null,
            SettingDtos = null,
            ReferenceDtos = null,
            PurposeDtos = null,
            PropertyIds = null,
            Identity = InteractionIdentity.ACT
        };

        var createTionResult =
            await _mutationService.CreateOrUpdateInteraction(
                _interactionRepo,
                _relationRepo, 
                _interactionService,
                createOrUpdateDto);

        Assert.IsNotNull(createTionResult);
        Assert.IsTrue(createTionResult.Id > 0);
        Assert.IsTrue(createTionResult.Uuid != null);
        // created interaction has first act of "to be"
        Assert.AreEqual(1, createTionResult.FirstActs.Count);
        Assert.AreEqual(createTionResult.FirstActs.First().LinkedInteraction.Label, "to be");
        var createdId = createTionResult.Id;
        // detach to avoid duplicate key error
        _dbContext.Entry(createTionResult).State = EntityState.Detached;
        var fullResult = await _queryService.GetInteractionFull(_interactionRepo, createdId);
        Assert.IsNotNull(fullResult);
        Assert.AreEqual(fullResult.Interaction.Label, "Test_Old");
        // detach to avoid duplicate key error
        _dbContext.Entry(fullResult.Interaction).State = EntityState.Detached;
    }

    // test create interaction with relations
    [TestMethod]
    public async Task TestCreateInteractionWithRelations()
    {
        var createOrUpdateDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = null,
            Uuid = null,
            Label = "Test_Old",
            Description = null,
            Content = null,
            Start = null,
            End = null,
            Data = null,
            PurposeDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.PurposeRelation
                }
            },
            SubjectDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.SubjectRelation
                }
            },
            FirstActDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.FirstActRelation
                }
            },
            ObjectDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.ObjectRelation
                }
            },
            SecondActDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.SecondActRelation
                }
            },
            ParallelDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.ParallelRelation
                }
            },
            IndirectObjectDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.IndirectObjectRelation
                }
            },
            SettingDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.SettingRelation
                }
            },
            ReferenceDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 1,
                    RelationType = RelationTypes.ReferenceRelation
                }
            },
            PropertyIds = null,
            Identity = InteractionIdentity.ACT
        };

        var iWithMultipleRelations =
            await _mutationService.CreateOrUpdateInteraction(
                _interactionRepo, 
                _relationRepo, 
                _interactionService,
                createOrUpdateDto);

        Assert.IsNotNull(iWithMultipleRelations);
        // check if all relations are created

        Assert.AreEqual(1, iWithMultipleRelations.Purposes.Count);
        Assert.AreEqual(1, iWithMultipleRelations.Subjects.Count);
        Assert.AreEqual(1, iWithMultipleRelations.FirstActs.Count);
        Assert.AreEqual(1, iWithMultipleRelations.Objects.Count);
        Assert.AreEqual(1, iWithMultipleRelations.SecondActs.Count);
        Assert.AreEqual(1, iWithMultipleRelations.Parallels.Count);
        Assert.AreEqual(1, iWithMultipleRelations.IndirectObjects.Count);
        Assert.AreEqual(1, iWithMultipleRelations.Settings.Count);
        Assert.AreEqual(1, iWithMultipleRelations.References.Count);
    }
}