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
public class RelationRepoUpdateTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly InteractDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public RelationRepoUpdateTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
        _dbContext = _serviceProvider.GetRequiredService<InteractDbContext>();
    }

    [TestMethod]
    public async Task Create_Any_Relations()
    {
        var emptyInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Empty_interaction",
        };

        var emptyInteraction = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepo,
            _interactionService,
            
            _relationRepo, _dbContext, emptyInteractionDto);

        var relationDto = new CreateOrUpdateRelationDto
        {
            Uuid = null,
            HostInteractionId = emptyInteraction.Id,
            RelationType = RelationTypes.ParallelRelation,
            Label = "Test_relation_1st",
            Description = "Test_relation_1st_description",
            Content = "Test_relation_1st_content",
            Weight = RelationWeight.Must,
            LinkedInteractionId = 1,
            Hits = 123,
            Order = 999,
        };
        
        var relation = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDto);
        
        var retrievedRelation = await _relationRepo.GetRelation<ParallelRelation>(
            relation.Uuid.Value,
            RelationTypes.ParallelRelation
            );
        
        Assert.IsNotNull(relation);
        Assert.IsNotNull(retrievedRelation);
        Assert.AreEqual(relation.Uuid, retrievedRelation.Uuid);
        Assert.AreEqual(relation.Label, retrievedRelation.Label);
        Assert.AreEqual(relation.Description, retrievedRelation.Description);
        Assert.AreEqual(relation.Content, retrievedRelation.Content);
        Assert.AreEqual(relation.Weight, retrievedRelation.Weight);
        Assert.AreEqual(relation.HostInteractionId, retrievedRelation.HostInteractionId);
        Assert.AreEqual(relation.LinkedInteractionId, retrievedRelation.LinkedInteractionId);
        Assert.AreEqual(relation.Hits, retrievedRelation.Hits);
        Assert.AreEqual(relation.Order, retrievedRelation.Order);
        
        // check if full interaction has this relation
        var retrievedInteraction = await _interactionRepo.GetInteractionFull(emptyInteraction.Id);
        Assert.IsNotNull(retrievedInteraction);
        Assert.AreEqual(1, retrievedInteraction.Parallels.Count);
        Assert.AreEqual(relation.Uuid, retrievedInteraction.Parallels.First().Uuid);
        
        
        
    }
    
    // update relation test
    [TestMethod]
    public async Task Update_Any_Relations()
    {
        var emptyInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Empty_interaction",
        };

        var emptyInteraction = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, emptyInteractionDto);
        
        // detach all entities from context
        _dbContext.ChangeTracker.Clear();

        var relationDtointial = new CreateOrUpdateRelationDto
        {
            Uuid = null,
            HostInteractionId = emptyInteraction.Id,
            RelationType = RelationTypes.ParallelRelation,
            Label = "Test_relation_1st",
            Description = "Test_relation_1st_description",
            Content = "Test_relation_1st_content",
            Weight = RelationWeight.Must,
            LinkedInteractionId = 1,
            Hits = 0,
            Order = 0,
            
        };
        
        var relation = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDtointial);
        
      
        // stop tracking relation
        _dbContext.Entry(relation).State = EntityState.Detached;
        Assert.IsNotNull(relation);
        
        var relationDtoUpdate = new CreateOrUpdateRelationDto
        {
            Uuid = relation.Uuid,
            HostInteractionId = emptyInteraction.Id,
            RelationType = RelationTypes.ParallelRelation,
            Label = "Test_relation_1st_updated",
            Description = "Test_relation_1st_description_updated",
            Content = "Test_relation_1st_content_updated",
            Weight = RelationWeight.Never,
            LinkedInteractionId = 1,
            Hits = 1,
            Order = 1,
        };
        
        var relationUpdated = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDtoUpdate);
        
        var retrievedUpdatedRelation = await _relationRepo.GetRelation<ParallelRelation>(
            relation.Uuid.Value,
            RelationTypes.ParallelRelation
            );
        
        Assert.IsNotNull(relationUpdated);
        Assert.IsNotNull(retrievedUpdatedRelation);
        
        Assert.AreEqual(relationUpdated.Label, retrievedUpdatedRelation.Label);
        Assert.AreEqual(relationUpdated.Description, retrievedUpdatedRelation.Description);
        Assert.AreEqual(relationUpdated.Content, retrievedUpdatedRelation.Content);
        Assert.AreEqual(relationUpdated.Weight, retrievedUpdatedRelation.Weight);
        Assert.AreEqual(relationUpdated.HostInteractionId, retrievedUpdatedRelation.HostInteractionId);
        Assert.AreEqual(relationUpdated.LinkedInteractionId, retrievedUpdatedRelation.LinkedInteractionId);
        Assert.AreEqual(relationUpdated.Hits, retrievedUpdatedRelation.Hits);
        Assert.AreEqual(relationUpdated.Order, retrievedUpdatedRelation.Order);
        
        // assert similarity with initial
        Assert.AreEqual(relation.Uuid, retrievedUpdatedRelation.Uuid);
        Assert.AreEqual(relation.Type, retrievedUpdatedRelation.Type);
        // assert different from initial
        Assert.AreNotEqual(relation.Label, retrievedUpdatedRelation.Label);
        Assert.AreNotEqual(relation.Description, retrievedUpdatedRelation.Description);
        Assert.AreNotEqual(relation.Content, retrievedUpdatedRelation.Content);
        Assert.AreNotEqual(relation.Weight, retrievedUpdatedRelation.Weight);
        Assert.AreNotEqual(relation.Hits, retrievedUpdatedRelation.Hits);
        Assert.AreNotEqual(relation.Order, retrievedUpdatedRelation.Order);
        
        // check if full interaction has this relation
        
        var retrievedInteraction = await _interactionRepo.GetInteractionFull(emptyInteraction.Id);
        
        Assert.IsNotNull(retrievedInteraction);
        
    }
    
    // update reference relations

    [TestMethod]
    public async Task Update_Reference_Relations()
    {
        var emptyInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Empty_interaction",
        };

        var emptyInteraction = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, emptyInteractionDto);

        // detach all entities from context
        _dbContext.ChangeTracker.Clear();

        var relationDtointial = new CreateOrUpdateRelationDto
        {
            Uuid = null,
            HostInteractionId = emptyInteraction.Id,
            RelationType = RelationTypes.ReferenceRelation,
            Label = "Test_relation_1st",
            Description = "Test_relation_1st_description",
            Content = "Test_relation_1st_content",
            Weight = RelationWeight.Must,
            LinkedInteractionId = 1,
            Hits = 0,
            Order = 0,

        };

        var relation = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDtointial);


        // stop tracking relation
        _dbContext.Entry(relation).State = EntityState.Detached;
        Assert.IsNotNull(relation);

        var relationDtoUpdate = new CreateOrUpdateRelationDto
        {
            Uuid = relation.Uuid,
            HostInteractionId = emptyInteraction.Id,
            RelationType = RelationTypes.ReferenceRelation,
            Label = "Test_relation_1st_updated",
            Description = "Test_relation_1st_description_updated",
            Content = "Test_relation_1st_content_updated",
            Weight = RelationWeight.Never,
            LinkedInteractionId = 1,
            Hits = 1,
            Order = 1,
        };

        var relationUpdated = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDtoUpdate);

        var finalUpdatedRelation = await _relationRepo.GetRelation<ReferenceRelation>(
            relation.Uuid.Value,
            RelationTypes.ReferenceRelation
        );

        Assert.IsNotNull(relationUpdated);
        Assert.IsNotNull(finalUpdatedRelation);

        Assert.AreEqual(relationUpdated.Label, finalUpdatedRelation.Label);
        Assert.AreEqual(relationUpdated.Description, finalUpdatedRelation.Description);
        Assert.AreEqual(relationUpdated.Content, finalUpdatedRelation.Content);
        Assert.AreEqual(relationUpdated.Weight, finalUpdatedRelation.Weight);
        Assert.AreEqual(relationUpdated.HostInteractionId, finalUpdatedRelation.HostInteractionId);
        Assert.AreEqual(relationUpdated.LinkedInteractionId, finalUpdatedRelation.LinkedInteractionId);
        Assert.AreEqual(relationUpdated.Hits, finalUpdatedRelation.Hits);
        Assert.AreEqual(relationUpdated.Order, finalUpdatedRelation.Order);
    }

    // test create first act relations
    [TestMethod]
    public async Task Create_First_Act_Relations()
    {
        var emptyInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Empty_interaction",
        };

        var emptyInteraction = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, emptyInteractionDto);

        var relationDto = new CreateOrUpdateRelationDto
        {
            Uuid = null,
            HostInteractionId = emptyInteraction.Id,
            RelationType = RelationTypes.FirstActRelation,
            Label = "Test_relation_1st",
            Description = "Test_relation_1st_description",
            Content = "Test_relation_1st_content",
            Weight = RelationWeight.Must,
            LinkedInteractionId = 1,
        };
        
        var relation = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDto);
        
        var retrievedRelation = await _relationRepo.GetRelation<FirstActRelation>(
            relation.Uuid.Value,
            RelationTypes.FirstActRelation
            );
        
        Assert.IsNotNull(relation);
        Assert.IsNotNull(retrievedRelation);
        Assert.AreEqual(relation.Uuid, retrievedRelation.Uuid);
        Assert.AreEqual(relation.Label, retrievedRelation.Label);
        Assert.AreEqual(relation.Description, retrievedRelation.Description);
        Assert.AreEqual(relation.Content, retrievedRelation.Content);
        Assert.AreEqual(relation.Weight, retrievedRelation.Weight);
        Assert.AreEqual(relation.HostInteractionId, retrievedRelation.HostInteractionId);
        Assert.AreEqual(relation.LinkedInteractionId, retrievedRelation.LinkedInteractionId);
        
        
    }
    
    // test create second act relations
    [TestMethod]
    public async Task Create_Second_Act_Relations()
    {
        var emptyInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Empty_interaction",
        };

        var emptyInteraction = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, emptyInteractionDto);

        var relationDto = new CreateOrUpdateRelationDto
        {
            Uuid = null,
            HostInteractionId = emptyInteraction.Id,
            RelationType = RelationTypes.SecondActRelation,
            Label = "Test_relation_1st",
            Description = "Test_relation_1st_description",
            Content = "Test_relation_1st_content",
            Weight = RelationWeight.Must,
            LinkedInteractionId = 1,
        };
        
        var relation = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDto);
        
        var retrievedRelation = await _relationRepo.GetRelation<SecondActRelation>(
            relation.Uuid.Value,
            RelationTypes.SecondActRelation
            );
        
        Assert.IsNotNull(relation);
        Assert.IsNotNull(retrievedRelation);
        Assert.AreEqual(relation.Uuid, retrievedRelation.Uuid);
        Assert.AreEqual(relation.Label, retrievedRelation.Label);
        Assert.AreEqual(relation.Description, retrievedRelation.Description);
        Assert.AreEqual(relation.Content, retrievedRelation.Content);
        Assert.AreEqual(relation.Weight, retrievedRelation.Weight);
        Assert.AreEqual(relation.HostInteractionId, retrievedRelation.HostInteractionId);
        Assert.AreEqual(relation.LinkedInteractionId, retrievedRelation.LinkedInteractionId);
        
        
    }
}


