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
public class InteractionRepoUpdateTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly ActDbContext _dbContext;

    public InteractionRepoUpdateTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<ActDbContext>();
    }

    [TestMethod]
    public async Task Interaction_With_Id_Should_Update()
    {
        var createOrUpdateDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = null,
            Uuid = null,
            Label = "Test_Label_Old",
            Description = "Test_Description_Old",
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

        var createdI =
            await _mutationService.CreateOrUpdateInteraction(_interactionRepo, _relationRepo, createOrUpdateDto);

        Assert.IsNotNull(createdI);
        Assert.IsTrue(createdI.Id > 0);
        Assert.IsTrue(createdI.Uuid != null);
        // created interaction has first act of "to be"
        Assert.AreEqual(1, createdI.FirstActs.Count);
        Assert.AreEqual(createdI.FirstActs.First().LinkedInteraction.Label, "to be");

        // detach to avoid tracking
        _dbContext.Entry(createdI).State = EntityState.Detached;

        var updatedI = await _mutationService.CreateOrUpdateInteraction(_interactionRepo, _relationRepo,
            new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_New",
                Description = "Test_Description_Old",
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
            });
        Assert.IsNotNull(updatedI);
        Assert.AreEqual(updatedI.Label, "Test_Label_New");
        Assert.AreEqual(updatedI.FirstActs.First().LinkedInteraction.Label, "to be");
        Assert.AreEqual(createdI.Id, updatedI.Id);
        Assert.AreEqual(createdI.Uuid, updatedI.Uuid);
        // same description
        Assert.AreEqual(createdI.Description, updatedI.Description);
    }

    [TestMethod]
    public async Task Interaction_With_Different_Relations_Should_Work()
    {
        var emptyDto = new CreateOrUpdateInteractionRequestDto
        {
            Id = null,
            Uuid = null,
            Label = "Test_Label_Old",
            Description = "Test_Description_Old",
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

        var createdI =
            await _mutationService.CreateOrUpdateInteraction(_interactionRepo, _relationRepo, emptyDto);
        Assert.AreEqual(createdI.FirstActs.Count, 1);
        // detach to avoid tracking
        _dbContext.Entry(createdI).State = EntityState.Detached;
        // add two subject relations
        var updatedI = await _mutationService.CreateOrUpdateInteraction(_interactionRepo, _relationRepo,
            new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
                Content = null,
                Start = null,
                End = null,
                Data = null,
                ContextDtos = null,
                SubjectDtos = new List<CreateOrUpdateRelationDto>
                {
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = null,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = "First_Subject_Old_Label",
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 1
                    },
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = null,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = null,
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 2
                    }
                },
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
            });

        Assert.AreEqual(updatedI.FirstActs.Count, 1);
        Assert.AreEqual(2, updatedI.Subjects.Count);
        Assert.AreEqual(updatedI.Subjects.First().Label, "First_Subject_Old_Label");
        var firstSubjectUuid = updatedI.Subjects.First().Uuid;
        var secondSubjectUuid = updatedI.Subjects.Last().Uuid;

        // detach to avoid tracking
        _dbContext.Entry(updatedI).State = EntityState.Detached;

        // add one more subject relation
        var updatedI2 = await _mutationService.CreateOrUpdateInteraction(_interactionRepo, _relationRepo,
            new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
                Content = null,
                Start = null,
                End = null,
                Data = null,
                ContextDtos = null,
                SubjectDtos = new List<CreateOrUpdateRelationDto>
                {
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = null,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = null,
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 3
                    }
                },
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
            });

        Assert.AreEqual(updatedI2.FirstActs.Count, 1);
        Assert.AreEqual(3, updatedI2.Subjects.Count);
        // check old relations by checking first label
        Assert.AreEqual(updatedI2.Subjects.First().Label, "First_Subject_Old_Label");
        // check uuid
        Assert.AreEqual(updatedI2.Subjects.First().Uuid, firstSubjectUuid);
        Assert.AreEqual(updatedI2.Subjects.Skip(1).First().Uuid, secondSubjectUuid);
        var thirdSubjectUuid = updatedI2.Subjects.Last().Uuid;
        // detach to avoid tracking
        _dbContext.Entry(updatedI2).State = EntityState.Detached;
        // detach subject relations
        _dbContext.Entry(updatedI2.Subjects.First()).State = EntityState.Detached;
        _dbContext.Entry(updatedI2.Subjects.Skip(1).First()).State = EntityState.Detached;
        _dbContext.Entry(updatedI2.Subjects.Last()).State = EntityState.Detached;


        // change the content of one of the subjects
        var updatedI3 = await _mutationService.CreateOrUpdateInteraction(_interactionRepo, _relationRepo,
            new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
                Content = null,
                Start = null,
                End = null,
                Data = null,
                ContextDtos = null,
                SubjectDtos = new List<CreateOrUpdateRelationDto>
                {
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = firstSubjectUuid,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = "First_Subject_New_Label",
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 1
                    },
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = secondSubjectUuid,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = "Second_Subject_New_Label",
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 2
                    },
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = thirdSubjectUuid,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = "Third_Subject_New_Label",
                        Description = null,
                        Content = "Test_New_Content",
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 3
                    }
                },
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
            });
        Assert.AreEqual(updatedI3.FirstActs.Count, 1);
        Assert.AreEqual(3, updatedI3.Subjects.Count);
        // check old relations by checking first label
        Assert.AreEqual(updatedI3.Subjects.First().Label, "First_Subject_New_Label");
        // check uuid
        Assert.AreEqual(updatedI3.Subjects.Skip(1).First().Label, "Second_Subject_New_Label");
        // check uuid
        Assert.AreEqual(updatedI3.Subjects.Skip(2).First().Label, "Third_Subject_New_Label");
        Assert.AreEqual(updatedI3.Subjects.Skip(2).First().Content, "Test_New_Content");
        // detach to avoid tracking
        _dbContext.Entry(updatedI3).State = EntityState.Detached;
        // detach subject relations
        _dbContext.Entry(updatedI3.Subjects.First()).State = EntityState.Detached;
        _dbContext.Entry(updatedI3.Subjects.Skip(1).First()).State = EntityState.Detached;
        _dbContext.Entry(updatedI3.Subjects.Last()).State = EntityState.Detached;
        

        // delete one subject relation
        var updatedI4 = await _mutationService.CreateOrUpdateInteraction(_interactionRepo, _relationRepo,
            new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
                Content = null,
                Start = null,
                End = null,
                Data = null,
                ContextDtos = null,
                SubjectDtos = new List<CreateOrUpdateRelationDto>
                {
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = updatedI3.Subjects.First().Uuid,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = "First_Subject_New_Label",
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 1
                    },
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = updatedI3.Subjects.Skip(2).First().Uuid,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = "Third_Subject_New_Label",
                        Description = null,
                        Content = "Test_New_Content",
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 3
                    }
                },
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
            });
        Assert.AreEqual(updatedI4.FirstActs.Count, 1);
        Assert.AreEqual(2, updatedI4.Subjects.Count);
        // check old relations by checking first label
        Assert.AreEqual(updatedI4.Subjects.First().Label, "First_Subject_New_Label");
        // check uuid
        Assert.AreEqual(updatedI4.Subjects.First().Uuid, updatedI3.Subjects.First().Uuid);
        Assert.AreEqual(updatedI4.Subjects.Skip(1).First().Label, "Third_Subject_New_Label");
        // check uuid
        Assert.AreEqual(updatedI4.Subjects.Skip(1).First().Uuid, updatedI3.Subjects.Skip(2).First().Uuid);
        Assert.AreEqual(updatedI4.Subjects.Skip(1).First().Content, "Test_New_Content");
    }
}