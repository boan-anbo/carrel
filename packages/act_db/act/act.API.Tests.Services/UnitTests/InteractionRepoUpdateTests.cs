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
public class InteractionRepoUpdateTests : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly InteractDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public InteractionRepoUpdateTests()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();

        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
        _dbContext = _serviceProvider.GetRequiredService<InteractDbContext>();
    }

    [TestMethod]
    public async Task Interaction_With_Id_Should_Update()
    {
        var createOrUpdateDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Test_Label_Old",
            Description = "Test_Description_Old",
            Identity = InteractionIdentity.ACT
        };

        var createdI =
            await _mutationService.CreateOrUpdateInteraction(
                _interactionRepo,
                _interactionService,
                _relationRepo, _dbContext, createOrUpdateDto);

        Assert.IsNotNull(createdI);
        Assert.IsTrue(createdI.Id > 0);
        Assert.IsTrue(createdI.Uuid != null);
        // created interaction has first act of "to be"
        Assert.AreEqual(1, createdI.FirstActs.Count);
        Assert.AreEqual(createdI.FirstActs.First().LinkedInteraction.Label, "to be");

        // detach to avoid tracking
        _dbContext.Entry(createdI).State = EntityState.Detached;

        var updatedI = await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_New",
                Description = "Test_Description_Old",
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
            Label = "Test_Label_Old",
            Description = "Test_Description_Old",
            Identity = InteractionIdentity.ACT
        };

        var createdI =
            await _mutationService.CreateOrUpdateInteraction(
                _interactionRepo,
                _interactionService,
                _relationRepo, _dbContext, emptyDto);
        Assert.AreEqual(createdI.FirstActs.Count, 1);
        // detach to avoid tracking
        _dbContext.Entry(createdI).State = EntityState.Detached;

        // add two subject relations
        var updatedI = await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
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
                Identity = InteractionIdentity.ACT
            });

        Assert.AreEqual(updatedI.FirstActs.Count, 1);
        Assert.AreEqual(2, updatedI.Subjects.Count);
        Assert.AreEqual("First_Subject_Old_Label",  updatedI.Subjects.Where(x => x.LinkedInteractionId == 1).FirstOrDefault()?.Label);
        var firstSubjectUuid = updatedI.Subjects.First().Uuid;
        var secondSubjectUuid = updatedI.Subjects.Last().Uuid;

        foreach (var subject in updatedI.Subjects)
        {
            _dbContext.Entry(subject).State = EntityState.Detached;
        }

        // detach to avoid tracking
        _dbContext.Entry(updatedI).State = EntityState.Detached;
        // detach all subjects to avoid tracking
        foreach (var subject in updatedI.Subjects)
        {
            _dbContext.Entry(subject).State = EntityState.Detached;
        }

        // add one more subject relation
        var updatedI2 = await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
                SubjectDtos = new List<CreateOrUpdateRelationDto>
                {
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = null,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.SubjectRelation,
                        Label = "Third_Subject_Old_Label",
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 3
                    }
                },
                Identity = InteractionIdentity.ACT
            });

        Assert.AreEqual(updatedI2.FirstActs.Count, 1);
        Assert.AreEqual(1, updatedI2.Subjects.Count);
        // make sure the other two subjects are dropped from the db
        var firstSubject =
            await _relationRepo.GetRelation<SubjectRelation>(firstSubjectUuid.Value, RelationTypes.SubjectRelation);
        Assert.IsNull(firstSubject);
        var secondSubject =
            await _relationRepo.GetRelation<SubjectRelation>(secondSubjectUuid.Value, RelationTypes.SubjectRelation);
        Assert.IsNull(secondSubject);
        var thirdSubject = await _relationRepo.GetRelation<SubjectRelation>(updatedI2.Subjects.First().Uuid.Value,
            RelationTypes.SubjectRelation);
        Assert.IsNotNull(thirdSubject);
    }

    [TestMethod]
    public async Task Update_To_Remove_Relations_Should_Work()
    {
        var emptyDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Test_Label_Old",
            Description = "Test_Description_Old",
            Identity = InteractionIdentity.ACT
        };

        var createdI =
            await GetMutationService().CreateOrUpdateInteraction(_interactionRepo,
                _interactionService,
                _relationRepo, _dbContext, emptyDto);

        Assert.AreEqual(createdI.FirstActs.Count, 1);
        // detach to avoid tracking
        _dbContext.Entry(createdI).State = EntityState.Detached;

        // add two subject relations
        var updatedI = await GetMutationService().CreateOrUpdateInteraction(_interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, new CreateOrUpdateInteractionRequestDto
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
            });
        Assert.AreEqual(1, updatedI.FirstActs.Count);
        Assert.AreEqual(2, updatedI.Subjects.Count);
        // first subject id
        var firstSubjectId = updatedI.Subjects.First().Uuid.Value;
        // detach to avoid tracking
        _dbContext.Entry(updatedI).State = EntityState.Detached;
        // detach updatedI.Subjects to avoid tracking
        foreach (var subject in updatedI.Subjects)
        {
            _dbContext.Entry(subject).State = EntityState.Detached;
        }

        var updatedI2Dto =
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
                },
                FirstActDtos = null,
                ObjectDtos = null,
                SecondActDtos = null,
                ParallelDtos = null,
                IndirectObjectDtos = null,
            };

        var updatedI2 = await GetMutationService()
            .CreateOrUpdateInteraction(_interactionRepo,
                _interactionService,
                _relationRepo, _dbContext, updatedI2Dto);
        //
        Assert.AreEqual(0, updatedI2.Subjects.Count);
        Assert.AreEqual(1, updatedI2.FirstActs.Count);
    }

    // get new instance of mutation service
    private IGraphQLMutation GetMutationService()
    {
        return _serviceProvider.GetService<IGraphQLMutation>();
    }

    [TestMethod]
    public async Task Interaction_Update_Should_Work_With_Any_Type()
    {
        var emptyDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Test_Label_Old",
            Description = "Test_Description_Old",
            Identity = InteractionIdentity.ACT
        };

        var createdI =
            await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
                _interactionService,
                _relationRepo, _dbContext, emptyDto);

        Assert.AreEqual(createdI.FirstActs.Count, 1);
        // detach to avoid tracking
        _dbContext.Entry(createdI).State = EntityState.Detached;

        // add two subject relations
        var updatedI = await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
                ParallelDtos = new List<CreateOrUpdateRelationDto>
                {
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = null,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.ParallelRelation,
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
                        RelationType = RelationTypes.ParallelRelation,
                        Label = null,
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 2
                    }
                },
                Identity = InteractionIdentity.ACT
            });

        Assert.AreEqual(updatedI.FirstActs.Count, 1);
        Assert.AreEqual(2, updatedI.Parallels.Count);
        Assert.AreEqual("First_Subject_Old_Label", updatedI.Parallels.Where(x => x.LinkedInteractionId == 1).FirstOrDefault().Label);
        var firstSubjectUuid = updatedI.Parallels.First().Uuid;
        var secondSubjectUuid = updatedI.Parallels.Last().Uuid;
        
        // detach to avoid tracking
        _dbContext.Entry(updatedI).State = EntityState.Detached;
        // detach updatedI.Parallels to avoid tracking
        foreach (var parallel in updatedI.Parallels)
        {
            _dbContext.Entry(parallel).State = EntityState.Detached;
        }

        // add one more subject relation
        var updatedI2 = await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "Test_Label_Old",
                Description = "Test_Description_Old",
                ParallelDtos = new List<CreateOrUpdateRelationDto>
                {
                    new CreateOrUpdateRelationDto
                    {
                        Uuid = null,
                        HostInteractionId = createdI.Id,
                        RelationType = RelationTypes.ParallelRelation,
                        Label = "Third_Subject_Old_Label",
                        Description = null,
                        Content = null,
                        Weight = RelationWeight.Must,
                        LinkedInteractionId = 3
                    }
                },
                Identity = InteractionIdentity.ACT
            });

        Assert.AreEqual(updatedI2.FirstActs.Count, 1);
        Assert.AreEqual(1, updatedI2.Parallels.Count);
        // make sure the other two subjects are dropped from the db
        var firstSubject =
            await _relationRepo.GetRelation<ParallelRelation>(firstSubjectUuid.Value, RelationTypes.ParallelRelation);
        Assert.IsNull(firstSubject);
        var secondSubject =
            await _relationRepo.GetRelation<ParallelRelation>(secondSubjectUuid.Value, RelationTypes.ParallelRelation);
        Assert.IsNull(secondSubject);
        var thirdSubject = await _relationRepo.GetRelation<ParallelRelation>(updatedI2.Parallels.First().Uuid.Value,
            RelationTypes.ParallelRelation);
        Assert.IsNotNull(thirdSubject);
    }
    
    // test updating content
    [TestMethod]
    public async Task Interaction_Update_Should_Work_With_Content()
    {
        var emptyDto = new CreateOrUpdateInteractionRequestDto
        {
            Label = "Test_Label_Old",
            Description = "Test_Description_Old",
            Content = "Test_Content_Old",
            Identity = InteractionIdentity.ACT
        };

        var createdI =
            await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
                _interactionService,
                _relationRepo, _dbContext, emptyDto);

        Assert.AreEqual(createdI.FirstActs.Count, 1);
        // check properties
        Assert.AreEqual("Test_Content_Old", createdI.Content);
        Assert.AreEqual("Test_Label_Old", createdI.Label);
        Assert.AreEqual("Test_Description_Old", createdI.Description);

        // add two subject relations
        var updatedI = await _mutationService.CreateOrUpdateInteraction(_interactionRepo,
            _interactionService,
            _relationRepo, _dbContext, new CreateOrUpdateInteractionRequestDto
            {
                Id = createdI.Id,
                Uuid = createdI.Uuid,
                Label = "1",
                Description = null,
                Content = null,
                Identity = InteractionIdentity.ACT
            });
        
        // check properties
        Assert.AreEqual(null, updatedI.Content);
        Assert.AreEqual("1", updatedI.Label);
        Assert.AreEqual(null, updatedI.Description);


    }
}