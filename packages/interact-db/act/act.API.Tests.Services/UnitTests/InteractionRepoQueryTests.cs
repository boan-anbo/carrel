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
public class InteractionRepoQueryTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly InteractDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public InteractionRepoQueryTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
        _dbContext = _serviceProvider.GetRequiredService<InteractDbContext>();
    }


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
                _interactionService,
                _relationRepo, _dbContext, createOrUpdateDto);

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

        var retrievedInteraction = await _queryService.GetInteractionFull(
            _interactionRepo,
            iWithMultipleRelations.Id);
        Assert.IsNotNull(retrievedInteraction);
        Assert.AreEqual(retrievedInteraction.Interaction.Settings.Count, 1);
    }

    [TestMethod]
    public async Task GetInteractionByUriShouldWork()
    {
        // create empty interaction

        var uri = Guid.NewGuid().ToString();
        var createOrUpdateDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = null,
            Uuid = null,
            Label = "Example",
            Description = null,
            Content = null,
            Start = null,
            End = null,
            Data = null,
            DataType = null,
            Uri = uri,
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
            TagDtos = null,
            PropertyIds = null,
            Identity = InteractionIdentity.ACT
        };
        var createdInteraction = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepo,
            _interactionService,
            _relationRepo,
            _dbContext,
            createOrUpdateDto);

        Assert.IsNotNull(createdInteraction);

        var interact = await _interactionRepo.GetInteractionFullByUri(uri);

        Assert.IsNotNull(interact);

        Assert.AreEqual(createOrUpdateDto.Uri, interact.Uri);
    }
    
    // query non existing interaction should return response but with null interaction
    [TestMethod]
    public async Task GetNonExistingInteractionByUriShouldReturnResponse()
    {
        var uri = Guid.NewGuid().ToString();
        var interactResponse = await _queryService.GetInteractionFullByUri(
            _interactionRepo,
            uri);

        Assert.IsNotNull(interactResponse);
        Assert.IsNull(interactResponse.Interaction);
    }
}