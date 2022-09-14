using act.API.Tests.Controllers;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Repositories.GraphQL;
using act.Services.Contracts;
using act.Services.Model;
using act.Services.Model.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace act.API.Tests.Services;

/// <summary>
/// Test basic interaction repo.
/// </summary>
[TestClass]
public class InteractionSentenceGenerationTest : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly InteractDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public InteractionSentenceGenerationTest()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<InteractDbContext>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
    }

    [TestMethod]
    public async Task TestInteractionSentenceGeneration()
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
                    LinkedInteractionId = 2,
                    RelationType = RelationTypes.PurposeRelation
                }
            },
            SubjectDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 3,
                    RelationType = RelationTypes.SubjectRelation
                }
            },
            FirstActDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 4,
                    RelationType = RelationTypes.FirstActRelation
                }
            },
            ObjectDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 5,
                    RelationType = RelationTypes.ObjectRelation
                }
            },
            SecondActDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 6,
                    RelationType = RelationTypes.SecondActRelation
                }
            },
            ParallelDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 7,
                    RelationType = RelationTypes.ParallelRelation
                }
            },
            IndirectObjectDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 8,
                    RelationType = RelationTypes.IndirectObjectRelation
                }
            },
            SettingDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 9,
                    RelationType = RelationTypes.SettingRelation
                }
            },
            ReferenceDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 10,
                    RelationType = RelationTypes.ReferenceRelation
                }
            },
            TagDtos =  new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto()
                {
                    LinkedInteractionId = 11,
                    RelationType = RelationTypes.TagRelation
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

        Assert.IsTrue(iWithMultipleRelations.Sentence.Length > 0);
    }

    [TestMethod]
    public async Task ExampleSentenceShouldMakeSense()
    {
        var fullExample = await _queryService.GetInteractionFull(
            _interactionRepo,
            14
            );
        // first sentence
        var sen = fullExample.Interaction;
        fullExample.Interaction.UpdateCalculatedFields();
        Assert.IsTrue(sen.Sentence.Length > 0);
        Assert.AreEqual("It makes sense", sen.Sentence);
        
        
    }

}

