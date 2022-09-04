using act.API.Tests.Controllers;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Repositories.GraphQL;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace act.API.Tests.Services;
[TestClass]
public class GraphQLQueryTests: TestBase
{
    //NOTE: should be replaced by an interface
    private readonly IGraphQLMutation _service;
    private readonly IInteractionRepository _interactionRepository;
    private readonly IRelationRepository _relationRepository;
    private readonly ActDbContext _dbContext;

    public GraphQLQueryTests()
    {
        _service = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _interactionRepository = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepository = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<ActDbContext>();
        //Newtonsoft.Json serializer (should be replaced once the known issue in System.Text.Json will be solved)
        
    }

    
    [TestMethod]
    public async Task Add_New_Entity_Should_Work()
    {
        var result = await _service.AddNewEntityInteraction(_interactionRepository, "test");
        
        Assert.IsNotNull(result);
        Assert.IsTrue(result.FirstActId > 0);
    }
    
    [TestMethod]
    public async Task Delete_Interaction_Works()
    {
        var createdInteraction = await _service.AddNewEntityInteraction(_interactionRepository, "test");
        
        Assert.IsNotNull(createdInteraction);
        var foundInteract = await _interactionRepository.GetInteractionFull(createdInteraction.Id);
        Assert.IsNotNull(foundInteract);
        Assert.AreEqual(createdInteraction.Id, foundInteract.Id);
        
        await _service.DeleteInteraction(createdInteraction.Id, _interactionRepository);
        
        var deletedInteraction = await _interactionRepository.GetInteractionFull(createdInteraction.Id);
        Assert.IsNull(deletedInteraction);
    }

    [TestMethod]
    public async Task Create_Relation_Works()
    {
        var testInteraction1 = await _service.AddNewEntityInteraction(_interactionRepository, "test1");
        var testInteraction2 = await _service.AddNewEntityInteraction(_interactionRepository, "test2");
        var requestDto = new CreateOrUpdateRelationDto
        {
            Id = null,
            Uuid = null,
            HostInteractionId = testInteraction1.Id,
            RelationType = RelationTypes.SettingRelation,
            Label = "test_label",
            Description = "test_description",
            Content = "test_content",
            Weight = RelationWeight.NotImportant,
            LinkedInteractionId = testInteraction2.Id
        };
        var createdRelation = await _service.CreateOrUpdateRelation(_relationRepository, requestDto) as SettingRelation;
        Assert.IsNotNull(createdRelation);
        Assert.AreEqual(testInteraction1.Id, createdRelation.HostInteractionId);
        Assert.AreEqual(testInteraction2.Id, createdRelation.LinkedInteractionId);
        Assert.IsTrue(createdRelation.Uuid != Guid.Empty);
        Assert.AreEqual(RelationTypes.SettingRelation, createdRelation.Type);
        Assert.AreEqual("test_label", createdRelation.Label);
        Assert.AreEqual("test_description", createdRelation.Description);
        Assert.AreEqual("test_content", createdRelation.Content);
        Assert.AreEqual(RelationWeight.NotImportant, createdRelation.Weight);
    }

    [TestMethod]
    public async Task Update_Relation_Works()
    {
        var testInteraction1 = await _service.AddNewEntityInteraction(_interactionRepository, "test1");
        var testInteraction2 = await _service.AddNewEntityInteraction(_interactionRepository, "test2");
        var requestDto = new CreateOrUpdateRelationDto
        {
            Id = null,
            Uuid = null,
            HostInteractionId = testInteraction1.Id,
            RelationType = RelationTypes.SettingRelation,
            Label = "test_label",
            Description = "test_description",
            Content = "test_content",
            Weight = RelationWeight.NotImportant,
            LinkedInteractionId = testInteraction2.Id
        };
        var createdRelation = await _service.CreateOrUpdateRelation(_relationRepository, requestDto) as SettingRelation;
        Assert.IsNotNull(createdRelation);
        Assert.AreEqual(testInteraction1.Id, createdRelation.HostInteractionId);
        Assert.AreEqual(testInteraction2.Id, createdRelation.LinkedInteractionId);
        Assert.IsTrue(createdRelation.Uuid != Guid.Empty);
        Assert.AreEqual(RelationTypes.SettingRelation, createdRelation.Type);
        Assert.AreEqual("test_label", createdRelation.Label);
        Assert.AreEqual("test_description", createdRelation.Description);
        Assert.AreEqual("test_content", createdRelation.Content);
        Assert.AreEqual(RelationWeight.NotImportant, createdRelation.Weight);
        /// Detach the first created relation, otherwise it will throw double-tracked exception
        _dbContext.Entry(createdRelation).State = EntityState.Detached;

        var updateDto = new CreateOrUpdateRelationDto
        {
            Uuid = createdRelation.Uuid,
            HostInteractionId = testInteraction1.Id,
            RelationType = RelationTypes.SettingRelation,
            Label = "test_label_updated",
            Description = "test_description_updated",
            Content = "test_content_updated",
            Weight = RelationWeight.Important,
            LinkedInteractionId = testInteraction2.Id
        };
        var updatedRelation = await _service.CreateOrUpdateRelation(_relationRepository, updateDto) as SettingRelation;
        Assert.IsNotNull(updatedRelation);
        Assert.AreEqual(testInteraction1.Id, updatedRelation.HostInteractionId);
        Assert.AreEqual(testInteraction2.Id, updatedRelation.LinkedInteractionId);
        Assert.AreEqual(createdRelation.Uuid, updatedRelation.Uuid);
        Assert.AreEqual(RelationTypes.SettingRelation, updatedRelation.Type);
        Assert.AreEqual("test_label_updated", updatedRelation.Label);
        Assert.AreEqual("test_description_updated", updatedRelation.Description);
        Assert.AreEqual("test_content_updated", updatedRelation.Content);
        Assert.AreEqual(RelationWeight.Important, updatedRelation.Weight);
    }



}