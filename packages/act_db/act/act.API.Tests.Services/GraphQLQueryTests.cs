using act.API.DataContracts;
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
public class GraphQLQueryTests : TestBase
{
    //NOTE: should be replaced by an interface
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepository;
    private readonly IRelationRepository _relationRepository;
    private readonly ActDbContext _dbContext;

    public GraphQLQueryTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepository = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepository = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<ActDbContext>();
        //Newtonsoft.Json serializer (should be replaced once the known issue in System.Text.Json will be solved)
    }


    [TestMethod]
    public async Task Add_New_Entity_Should_Work()
    {
        var result = await _mutationService.AddNewEntityInteraction(_interactionRepository, "test");

        Assert.IsNotNull(result);
        Assert.IsTrue(result.FirstActs.Count > 0);
    }

    [TestMethod]
    public async Task Delete_Interaction_Works()
    {
        var createdInteraction = await _mutationService.AddNewEntityInteraction(_interactionRepository, "test");

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
        var testInteraction1 = await _mutationService.AddNewEntityInteraction(_interactionRepository, "test1");
        var testInteraction2 = await _mutationService.AddNewEntityInteraction(_interactionRepository, "test2");
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
        var testInteraction1 = await _mutationService.AddNewEntityInteraction(_interactionRepository, "test1");
        var testInteraction2 = await _mutationService.AddNewEntityInteraction(_interactionRepository, "test2");
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
    /// Test get full and get full with relations
    ///  </summary>
    [TestMethod]
    public async Task Get_Full_Interaction_Works()
    {
        var firstInteraction = await _queryService.GetInteractionFull(_interactionRepository, 1);
        Assert.AreEqual(firstInteraction.Interaction.Label, "Air pollution");
        Assert.IsNotNull(firstInteraction);
        Assert.AreEqual(1, firstInteraction.Interaction.Id);
        Assert.AreEqual(InteractionResultType.FullInteraction, firstInteraction.ResultType);
        Assert.IsTrue(firstInteraction.Interaction.FirstActs != null);
        /// create a new entity interaction
        var createdInteraction = await _mutationService.AddNewEntityInteraction(_interactionRepository, "health");
        Assert.IsNotNull(createdInteraction);
        Assert.AreEqual(createdInteraction.Label, "health");
        // var createAct = await _mutationService.AddNewAct(_actRepository, createdInteraction.Id, "test");

        /// add a subject relation to the first interaction
        var createOrUpdateInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = firstInteraction.Interaction.Id,
            Uuid = firstInteraction.Interaction.Uuid,
            Label = null,
            Description = null,
            Start = null,
            End = null,
            ContextDtos = null,
            SubjectDtos = null,
            ObjectDtos = null,
            ParallelDtos = null,
            IndirectObjectDtos = null,
            SettingDtos = null,
            ReferenceDtos = null,
            PurposeDtos = null,
            PropertyIds = null,
            Identity = InteractionIdentity.ENTITY,
        };
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
    public async Task Adding_Subjects_Works()
    {
        var firstInteractionResult = await _queryService.GetInteractionFull(_interactionRepository, 1);
        Assert.AreEqual(firstInteractionResult.Interaction.Label, "Air pollution");
        var I = await _queryService.GetInteractionFull(_interactionRepository, 2);
        Assert.AreEqual(I.Interaction.Label, "I");
        var you = await _queryService.GetInteractionFull(_interactionRepository, 3);
        Assert.AreEqual(you.Interaction.Label, "you");
        
        var firstInteractionID = firstInteractionResult.Interaction.Id;
        var firstInteractionUUID = firstInteractionResult.Interaction.Uuid;
        
        var IId = I.Interaction.Id;
        var YouId = you.Interaction.Id;

        _dbContext.Entry(firstInteractionResult.Interaction).State = EntityState.Detached;
        _dbContext.Entry(I.Interaction).State = EntityState.Detached;
        _dbContext.Entry(you.Interaction).State = EntityState.Detached;

        /// add you and I to the first interaction
        var createOrUpdateInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = 0,
            Uuid = null,
            Label = "Interaction with two subjects",
            Description = null,
            Start = null,
            End = null,
            ContextDtos = null,
            SubjectDtos =
            {
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = firstInteractionID,
                    RelationType = RelationTypes.SubjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = IId
                },
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = firstInteractionID,
                    RelationType = RelationTypes.SubjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = YouId
                }
            },
            ObjectDtos = null,
            ParallelDtos = null,
            IndirectObjectDtos = null,
            SettingDtos = null,
            ReferenceDtos = null,
            PurposeDtos = null,
            PropertyIds = null,
            Identity = InteractionIdentity.ENTITY,
        };


        var createdInteraction = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepository,
            _relationRepository,
            createOrUpdateInteractionDto);

        Assert.IsNotNull(createdInteraction);
        Assert.AreEqual(createdInteraction.Label, "Interaction with two subjects");
        Assert.AreEqual( 2, createdInteraction.Subjects.Count);
        var fullInteraction = await _queryService.GetInteractionFull(_interactionRepository, createdInteraction.Id);
        Assert.AreEqual(2, fullInteraction.Interaction.Subjects.Count);
        // It should have three nodes, You, I, And Interaction with two subjects
        Assert.AreEqual(3, fullInteraction.Graph.Nodes.Count);
        // check if the three nodes exist
        Assert.IsTrue(fullInteraction.Graph.Nodes.Any(n => n.Label == "you"));
        Assert.IsTrue(fullInteraction.Graph.Nodes.Any(n => n.Label == "I"));
        Assert.IsTrue(fullInteraction.Graph.Nodes.Any(n => n.Label == "Interaction with two subjects"));
        // It should have two subject relations with you and I
        Assert.AreEqual(2, fullInteraction.Graph.Edges.Count);
        
        // create another interaction with two subjects and one context
        var createOrUpdateInteractionDto2 = new CreateOrUpdateInteractionRequestDto
        {
            Id = 0,
            Uuid = null,
            Label = "Interaction with two subjects and one context",
            Description = null,
            Start = null,
            End = null,
            ContextDtos = new List<CreateOrUpdateRelationDto>
            {
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = 0,
                    RelationType = RelationTypes.ContextRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = 7
                }
            },
            SubjectDtos =
            {
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = 0,
                    RelationType = RelationTypes.SubjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = IId
                },
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = 0,
                    RelationType = RelationTypes.SubjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = YouId
                }
            },
            ObjectDtos = null,
            ParallelDtos = null,
            IndirectObjectDtos = null,
            SettingDtos = null,
            ReferenceDtos = null,
            PurposeDtos = null,
            PropertyIds = null,
            Identity = InteractionIdentity.ENTITY,
        };

        var createdInteraction2 = await _mutationService.CreateOrUpdateInteraction(
            _interactionRepository,
            _relationRepository,
            createOrUpdateInteractionDto2);
         
        Assert.IsNotNull(createdInteraction2);
        Assert.AreEqual(createdInteraction2.Label, "Interaction with two subjects and one context");
        Assert.AreEqual(2, createdInteraction2.Subjects.Count);
        Assert.AreEqual(1, createdInteraction2.Contexts.Count);
        var fullInteraction2 = await _queryService.GetInteractionFull(_interactionRepository, createdInteraction2.Id);
        Assert.AreEqual(2, fullInteraction2.Interaction.Subjects.Count);
        Assert.AreEqual(1, fullInteraction2.Interaction.Contexts.Count);
        // It should have four nodes, You, I, Interaction with two subjects and one context, and the context
        Assert.AreEqual(4, fullInteraction2.Graph.Nodes.Count);
        // check if the four nodes exist
        Assert.IsTrue(fullInteraction2.Graph.Nodes.Any(n => n.Label == "you"));
        Assert.IsTrue(fullInteraction2.Graph.Nodes.Any(n => n.Label == "I"));
        Assert.IsTrue(fullInteraction2.Graph.Nodes.Any(n => n.Label == "Interaction with two subjects and one context"));
        Assert.IsTrue(fullInteraction2.Graph.Nodes.Any(n => n.Label == "earth"));
        // It should have three subject relations with you and I and one context relation
        Assert.AreEqual(3, fullInteraction2.Graph.Edges.Count);
        
        fullInteraction2.Interaction.UpdateSentence();
        
        Assert.AreEqual("I and you interact with earth.", fullInteraction2.Interaction.Sentence);
        
    }

    [TestMethod]
    public async Task Full_Sentence_Should_Workd()
    {
        //   new Interaction
        // {
        //     Id = 5,
        //     Label = "the environment",
        //     FirstActId = 1,
        //     Identity = InteractionIdentity.ENTITY
        // },
        // new Interaction
        // {
        //     Id = 6,
        //     Label = "future",
        //     FirstActId = 1,
        //     Identity = InteractionIdentity.ENTITY
        // },
        // new Interaction
        // {
        //     Id = 7,
        //     Label = "earth",
        //     FirstActId = 1,
        //     Identity = InteractionIdentity.ENTITY
        // },
        // new Interaction
        // {
        //     Id = 8,
        //     Label = "common sense",
        //     FirstActId = 1,
        //     Identity = InteractionIdentity.ENTITY
        // },
        // new Interaction
        // {
        //     Id = 9,
        //     Label = "climate change",
        //     FirstActId = 1,
        //     Identity = InteractionIdentity.ENTITY
        // }
        var firstInteractionResult = await _queryService.GetInteractionFull(_interactionRepository, 5);
        Assert.AreEqual(firstInteractionResult.Interaction.Label, "Air pollution");
        var I = await _queryService.GetInteractionFull(_interactionRepository, 2);
        Assert.AreEqual(I.Interaction.Label, "I");
        var you = await _queryService.GetInteractionFull(_interactionRepository, 3);
        Assert.AreEqual(you.Interaction.Label, "you");
        var plasticBottle = await _queryService.GetInteractionFull(_interactionRepository, 4);
        Assert.AreEqual(plasticBottle.Interaction.Label, "plastic bottles");
        var theEnvironment = await _queryService.GetInteractionFull(_interactionRepository, 5);
        Assert.AreEqual(theEnvironment.Interaction.Label, "the environment");
        var future = await _queryService.GetInteractionFull(_interactionRepository, 6);
        Assert.AreEqual(future.Interaction.Label, "future");
        var earth = await _queryService.GetInteractionFull(_interactionRepository, 7);
        Assert.AreEqual(earth.Interaction.Label, "earth");
        var commonSense = await _queryService.GetInteractionFull(_interactionRepository, 8);
        Assert.AreEqual(commonSense.Interaction.Label, "common sense");
        var climateChange = await _queryService.GetInteractionFull(_interactionRepository, 9);
        Assert.AreEqual(climateChange.Interaction.Label, "climate change");
        var firstInteractionID = firstInteractionResult.Interaction.Id;
        var IId = I.Interaction.Id;
        var firstInteractionUUID = firstInteractionResult.Interaction.Uuid; 
        var YouId = you.Interaction.Id;
        
        var createOrUpdateInteractionDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = 0,
            Uuid = null,
            Label = "full sentence",
            Description = null,
            Start = null,
            End = null,
            ContextDtos = null,
            SubjectDtos =
            {
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = firstInteractionID,
                    RelationType = RelationTypes.SubjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = IId
                },
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = firstInteractionID,
                    RelationType = RelationTypes.SubjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = YouId
                }
            },
            ObjectDtos =
            {
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = firstInteractionID,
                    RelationType = RelationTypes.ObjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = plasticBottle.Interaction.Id
                },
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = firstInteractionID,
                    RelationType = RelationTypes.ObjectRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = theEnvironment.Interaction.Id
                },
            },
            IndirectObjectDtos = null,
            SettingDtos =
            {
                new CreateOrUpdateRelationDto
                {
                    HostInteractionId = firstInteractionID,
                    RelationType = RelationTypes.SettingRelation,
                    Label = null,
                    Description = null,
                    Content = null,
                    Weight = RelationWeight.Must,
                    LinkedInteractionId = earth.Interaction.Id
                },
            },
            ReferenceDtos = null,
            PurposeDtos = null,
            ParallelDtos = null,
            PropertyIds = null,
            Identity = InteractionIdentity.ENTITY,
        }; 
        
        var fullInteraction = await _mutationService.CreateOrUpdateInteraction(_interactionRepository, _relationRepository, createOrUpdateInteractionDto);
        Assert.AreEqual(fullInteraction.Label, "full sentence");
        fullInteraction.UpdateSentence();
        Assert.AreEqual(fullInteraction.Sentence, "I and you plastic bottles and the environment in the setting(s) of earth");
    }
}