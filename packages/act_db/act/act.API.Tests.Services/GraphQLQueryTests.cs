using act.API.DataContracts;
using act.API.Tests.Controllers;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Repositories.GraphQL;
using act.Services.Contracts;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace act.API.Tests.Services;

[TestClass]
public class GraphQLQueryTests : TestBase
{
    //NOTE: should be replaced by an interface
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepository;
    private readonly IRelationRepository _relationRepository;
    private readonly ActDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public GraphQLQueryTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepository = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepository = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<ActDbContext>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
        //Newtonsoft.Json serializer (should be replaced once the known issue in System.Text.Json will be solved)
    }


    [TestMethod]
    public async Task Add_New_Entity_Should_Work()
    {
        var result =
            await _mutationService.AddNewEntityInteraction(_interactionRepository, _relationRepository, "test");

        Assert.IsNotNull(result);
        Assert.IsTrue(result.FirstActs.Count > 0);
    }

    [TestMethod]
    public async Task Delete_Interaction_Works()
    {
        var createdInteraction =
            await _mutationService.AddNewEntityInteraction(_interactionRepository, _relationRepository, "test");

        Assert.IsNotNull(createdInteraction);
        var foundInteract = await _interactionRepository.GetInteractionFull(createdInteraction.Id);
        Assert.IsNotNull(foundInteract);
        Assert.AreEqual(createdInteraction.Id, foundInteract.Id);

        await _mutationService.DeleteInteraction(createdInteraction.Id, _interactionRepository);

        var deletedInteraction = await _interactionRepository.GetInteractionFull(createdInteraction.Id);
        Assert.IsNull(deletedInteraction);
    }

    [TestMethod]
    public async Task Create_Relation_Works()
    {
        var testInteraction1 =
            await _mutationService.AddNewEntityInteraction(_interactionRepository, _relationRepository, "test1");
        var testInteraction2 =
            await _mutationService.AddNewEntityInteraction(_interactionRepository, _relationRepository, "test2");
        var requestDto = new CreateOrUpdateRelationDto
        {
            Uuid = null,
            HostInteractionId = testInteraction1.Id,
            RelationType = RelationTypes.SettingRelation,
            Label = "test_label",
            Description = "test_description",
            Content = "test_content",
            Weight = RelationWeight.NotImportant,
            LinkedInteractionId = testInteraction2.Id
        };
        var createdRelation =
            await _mutationService.CreateOrUpdateRelation(_relationRepository, requestDto) as SettingRelation;
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
        var testInteraction1 =
            await _mutationService.AddNewEntityInteraction(_interactionRepository, _relationRepository, "test1");
        var testInteraction2 =
            await _mutationService.AddNewEntityInteraction(_interactionRepository, _relationRepository, "test2");
        var requestDto = new CreateOrUpdateRelationDto
        {
            Uuid = null,
            HostInteractionId = testInteraction1.Id,
            RelationType = RelationTypes.SettingRelation,
            Label = "test_label",
            Description = "test_description",
            Content = "test_content",
            Weight = RelationWeight.NotImportant,
            LinkedInteractionId = testInteraction2.Id
        };
        var createdRelation =
            await _mutationService.CreateOrUpdateRelation(_relationRepository, requestDto) as SettingRelation;
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
        var updatedRelation =
            await _mutationService.CreateOrUpdateRelation(_relationRepository, updateDto) as SettingRelation;
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


    /// <summary>
    /// Test graph generation on interactions with all relations
    /// </summary>
    [TestMethod]
    public async Task Generate_Graph_Works()
    {
        // var queryResult = _mutationService.
        return;
    }


    [TestMethod]
    public async Task Full_Sentence_Should_Workd()
    {
        var fullInteraction = await _interactionRepository.GetInteractionFull(14);
        fullInteraction.UpdateSentence();
        Assert.IsTrue(
            fullInteraction.Sentence.Length > 0
        );
    }
}