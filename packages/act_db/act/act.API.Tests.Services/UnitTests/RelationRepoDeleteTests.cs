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
public class RelationRepoDeleteTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly ActDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public RelationRepoDeleteTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<ActDbContext>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
    }

    [TestMethod]
    public async Task Delete_Any_Relation()
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
        };
        
        var relation = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDto);
        
        Assert.IsNotNull(relation);
        
        // check if the relation exists
        var relationFromDb = await _relationRepo.GetRelation<ParallelRelation>(relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNotNull(relationFromDb);
        
        // check if the interaction has the lreation
        var interaction = await _interactionRepo.GetInteractionFull(emptyInteraction.Id); 
        Assert.IsNotNull(interaction);
        // delete relation
        await _mutationService.DeleteRelation(_relationRepo, relation.Uuid.Value, relationDto.RelationType);
        var deletedRelation = await _relationRepo.GetRelation<ParallelRelation>(  relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNull(deletedRelation);
        
        // check if the interaction no longer has the relation
        var interaction_after_deletion = await _interactionRepo.GetInteractionFull(emptyInteraction.Id);
        Assert.IsNotNull(interaction_after_deletion);
        Assert.AreEqual(0, interaction_after_deletion.Parallels.Count);
        
        
        
    }
    
    // test delete first acts
    [TestMethod]
    public async Task Delete_First()
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
        
        Assert.IsNotNull(relation);
        // get created relation
        var firstActRelation = await _relationRepo.GetRelation<FirstActRelation>(relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNotNull(firstActRelation);
        // delete relation
        await _mutationService.DeleteRelation(_relationRepo, relation.Uuid.Value, relationDto.RelationType);
        
        var deletedRelation = await _relationRepo.GetRelation<FirstActRelation>(relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNull(deletedRelation);
        
        // check if the interaction no longer has the relation
        var interaction = await _interactionRepo.GetInteractionFull(emptyInteraction.Id);
        Assert.IsNotNull(interaction);
        // this should be 1, not 0, buecause an empty dto gets automatically added a first act of existence: "to be"
        Assert.AreEqual(1, interaction.FirstActs.Count);
        
    }
    
    // test delete second acts 
    
    [TestMethod]
    public async Task Delete_Second_Acts()
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
        
        Assert.IsNotNull(relation);
        
        // get created relation
        var secondActRelation = await _relationRepo.GetRelation<SecondActRelation>(relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNotNull(secondActRelation);
        
        // delete relation
        await _mutationService.DeleteRelation(_relationRepo, relation.Uuid.Value, relationDto.RelationType);
        
        var deletedRelation = await _relationRepo.GetRelation<SecondActRelation>(relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNull(deletedRelation);
        
        // check if the interaction no longer has the relation
        var interaction = await _interactionRepo.GetInteractionFull(emptyInteraction.Id);
        Assert.IsNotNull(interaction);
        Assert.AreEqual(0, interaction.SecondActs.Count);
    }
    
    // test delete subject
    [TestMethod]
    public async Task Delete_Subject()
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
            RelationType = RelationTypes.SubjectRelation,
            Label = "Test_relation_1st",
            Description = "Test_relation_1st_description",
            Content = "Test_relation_1st_content",
            Weight = RelationWeight.Must,
            LinkedInteractionId = 1,
        };
        
        var relation = await _mutationService.CreateOrUpdateRelation(
            _relationRepo,
            relationDto);
        
        Assert.IsNotNull(relation);
        
        // get created relation
        var subjectRelation = await _relationRepo.GetRelation<SubjectRelation>(relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNotNull(subjectRelation);
        
        // delete relation
        await _mutationService.DeleteRelation(_relationRepo, relation.Uuid.Value, relationDto.RelationType);
        
        var deletedRelation = await _relationRepo.GetRelation<SubjectRelation>(relation.Uuid.Value, relationDto.RelationType);
        Assert.IsNull(deletedRelation);
        
        // check if the interaction no longer has the relation
        var interaction = await _interactionRepo.GetInteractionFull(emptyInteraction.Id);
        Assert.IsNotNull(interaction);
        Assert.AreEqual(0, interaction.Subjects.Count);
    }

}

