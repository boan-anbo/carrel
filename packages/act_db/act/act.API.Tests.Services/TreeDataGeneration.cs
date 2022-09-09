using act.API.Tests.Controllers;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Repositories.GraphQL;
using act.Services.Contracts;
using act.Services.Model;
using InteractGraphLib;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace act.API.Tests.Services;

/// <summary>
/// Test basic interaction repo.
/// </summary>
[TestClass]
public class TreeDataGenerationTest : TestBase
{
    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly InteractDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public TreeDataGenerationTest()
    {
        _mutationService = _serviceProvider.GetRequiredService<IGraphQLMutation>();
        _queryService = _serviceProvider.GetRequiredService<GraphQLQuery>();
        _interactionRepo = _serviceProvider.GetRequiredService<IInteractionRepository>();
        _relationRepo = _serviceProvider.GetRequiredService<IRelationRepository>();
        _dbContext = _serviceProvider.GetRequiredService<InteractDbContext>();
        _interactionService = _serviceProvider.GetRequiredService<IInteractionService>();
    }

    private async Task<Interaction?> Create(CreateOrUpdateInteractionRequestDto dto)
    {
        return await _mutationService.CreateOrUpdateInteraction(
            _interactionRepo,
            _interactionService,
            _relationRepo,
            _dbContext,
            dto
        );
    }

    private async Task<Interaction?> CreateByName(string name)
    {
        return await Create(new CreateOrUpdateInteractionRequestDto
        {
            Label = name
        });
    }

    [TestMethod]
    public async Task GenerateSimpleData()
    {
        var liz = await CreateByName("Liz");
        var yangYang = await CreateByName("Yang Yang");

        Assert.IsNotNull(liz);
        Assert.IsNotNull(yangYang);
    }

    private async Task<Interaction?> AddSingleChildToFather(Interaction child, Interaction father, Interaction hasChild)
    {
        return await Create(new CreateOrUpdateInteractionRequestDto
        {
            Label = $"{child.Label}'s father is {father.Label}",
            SubjectDtos =
                new List<CreateOrUpdateRelationDto>()
                {
                    new CreateOrUpdateRelationDto
                    {
                        RelationType = RelationTypes.SubjectRelation,
                        LinkedInteractionId = father.Id
                    }
                },
            FirstActDtos =
                new List<CreateOrUpdateRelationDto>()
                {
                    new CreateOrUpdateRelationDto
                    {
                        RelationType = RelationTypes.FirstActRelation,
                        LinkedInteractionId = hasChild.Id
                    }
                },
            ObjectDtos =
                new List<CreateOrUpdateRelationDto>()
                {
                    new CreateOrUpdateRelationDto
                    {
                        RelationType = RelationTypes.ObjectRelation,
                        LinkedInteractionId = child.Id
                    }
                }
        });
    }

    // add multiple children to father
    private async Task<Interaction?> AddMultipleChildrenToFather(Interaction father, Interaction hasChild,
        params Interaction[] children)
    {
        return await Create(new CreateOrUpdateInteractionRequestDto
        {
            Label = $"{father.Label}'s children are {string.Join(", ", children.Select(c => c.Label))}",
            SubjectDtos =
                new List<CreateOrUpdateRelationDto>()
                {
                    new CreateOrUpdateRelationDto
                    {
                        RelationType = RelationTypes.SubjectRelation,
                        LinkedInteractionId = father.Id
                    }
                },
            FirstActDtos =
                new List<CreateOrUpdateRelationDto>()
                {
                    new CreateOrUpdateRelationDto
                    {
                        RelationType = RelationTypes.FirstActRelation,
                        LinkedInteractionId = hasChild.Id
                    }
                },
            ObjectDtos =
                children.Select(c => new CreateOrUpdateRelationDto
                {
                    RelationType = RelationTypes.ObjectRelation,
                    LinkedInteractionId = c.Id
                }).ToList()
        });
    }

    [TestMethod]
    public async Task GenerateNuclearFamilyWithTwoRelations()
    {
        var hasAChild = await CreateByName("Has a child of");
        var liz = await CreateByName("Liz");
        var yangYang = await CreateByName("Yangyang");
        var genZhu = await CreateByName("Genzhu");

        Assert.IsNotNull(liz);
        Assert.IsNotNull(yangYang);
        Assert.IsNotNull(genZhu);

        var genZhuHasLiz = await AddSingleChildToFather(liz, genZhu, hasAChild);

        Assert.IsNotNull(genZhuHasLiz);
        // check father and child
        Assert.AreEqual(genZhuHasLiz.Subjects.Count, 1);
        Assert.AreEqual(genZhuHasLiz.Objects.Count, 1);
        Assert.AreEqual(genZhuHasLiz.FirstActs.Count, 1);
        Assert.AreEqual(liz.Label, genZhuHasLiz.Objects.FirstOrDefault().LinkedInteraction.Label);
        Assert.AreEqual(genZhu.Label, genZhuHasLiz.Subjects.FirstOrDefault().LinkedInteraction.Label);

        var genZhuHasYangYang = await AddSingleChildToFather(yangYang, genZhu, hasAChild);

        Assert.IsNotNull(genZhuHasYangYang);
        // check father and child
        Assert.AreEqual(genZhuHasYangYang.Subjects.Count, 1);
        Assert.AreEqual(genZhuHasYangYang.Objects.Count, 1);
        Assert.AreEqual(genZhuHasYangYang.FirstActs.Count, 1);
        Assert.AreEqual(yangYang.Label, genZhuHasYangYang.Objects.FirstOrDefault().LinkedInteraction.Label);
        Assert.AreEqual(genZhu.Label, genZhuHasYangYang.Subjects.FirstOrDefault().LinkedInteraction.Label);

        var seeds = new InteractTreeSeed(
            new List<Interaction>()
            {
                genZhuHasLiz
            },
            new List<RelationTypes>()
            {
                RelationTypes.ObjectRelation
            },
            new List<AsRelationTypes>()
            {
            }
        );
        var treeGen = new InteractTreeGrower(_dbContext, seeds);

        var tree = treeGen.Grow();
        Assert.IsNotNull(tree);
        Assert.AreEqual(tree.Count, 1);
        Assert.AreEqual(1, tree.FirstOrDefault().Children.Count);
        Assert.AreEqual(liz.Id, tree.FirstOrDefault().Children.FirstOrDefault().InteractionId);

        var seedFromGenzhu = new InteractTreeSeed(
            new List<Interaction>()
            {
                genZhuHasLiz,
                genZhuHasYangYang
            },
            new List<RelationTypes>()
            {
                RelationTypes.ObjectRelation
            },
            new List<AsRelationTypes>()
            {
            }
        );

        var treeGenFromGenzhu = new InteractTreeGrower(_dbContext, seedFromGenzhu);

        var treeFromGenzhu = treeGenFromGenzhu.Grow();

        Assert.IsNotNull(treeFromGenzhu);
        Assert.AreEqual(treeFromGenzhu.Count, 2);
        Assert.AreEqual(1, treeFromGenzhu.FirstOrDefault().Children.Count);
        Assert.AreEqual(1, treeFromGenzhu.LastOrDefault().Children.Count);
    }

    // GenerateNuclearFamilyWithSingleRelations For Multiple Children
    [TestMethod]
    public async Task GenerateNuclearFamilyWithSingleRelationsForMultipleChildren()
    {
        var hasAChild = await CreateByName("Has a child of");
        var liz = await CreateByName("Liz");
        var yangYang = await CreateByName("Yangyang");
        var genZhu = await CreateByName("Genzhu");


        var genZhuHasChildren = await AddMultipleChildrenToFather(genZhu, hasAChild, liz, yangYang);

        Assert.IsNotNull(genZhuHasChildren);
        // check father and child
        Assert.AreEqual(genZhuHasChildren.Subjects.Count, 1);
        Assert.AreEqual(genZhuHasChildren.Objects.Count, 2);
        Assert.AreEqual(genZhuHasChildren.FirstActs.Count, 1);
        Assert.IsTrue(genZhuHasChildren.Objects.Any(i => i.LinkedInteraction.Label == liz.Label));
        Assert.IsTrue(genZhuHasChildren.Objects.Any(i => i.LinkedInteraction.Label == yangYang.Label));


        var seeds = new InteractTreeSeed(
            new List<Interaction>()
            {
                genZhuHasChildren
            },
            new List<RelationTypes>()
            {
                RelationTypes.ObjectRelation
            },
            new List<AsRelationTypes>()
            {
            }
        );
        var treeGen = new InteractTreeGrower(_dbContext, seeds);

        var tree = treeGen.Grow();
        Assert.IsNotNull(tree);
        Assert.AreEqual(tree.Count, 1);
        Assert.AreEqual(2, tree.FirstOrDefault().Children.Count);
        Assert.IsTrue(tree.FirstOrDefault().Children.Any(i => i.InteractionId == liz.Id));
        Assert.IsTrue(tree.FirstOrDefault().Children.Any(i => i.InteractionId == yangYang.Id));
    }


    // GenerateNuclearFamilyWithSingleRelations For Multiple Children for two generations
    [TestMethod]
    public async Task GenerateNuclearFamilyWithSingleRelationsForMultipleChildrenForTwoGenerations()
    {
        var hasChildren = await CreateByName("Has children of");
        var liz = await CreateByName("Liz");
        var yangYang = await CreateByName("Yangyang");
        var genZhu = await CreateByName("Genzhu");
        var genZhuHasChildren = await AddMultipleChildrenToFather(genZhu, hasChildren, liz, yangYang);

        var yuxi = await CreateByName("Yuxi");
        var langfeng = await CreateByName("Langfeng");
        var yangyangHasChildren = await AddMultipleChildrenToFather(yangYang, hasChildren, yuxi, langfeng);


        var seed = new InteractTreeSeed(
            new List<Interaction>()
            {
                genZhu
            },
            new List<RelationTypes>()
            {
                RelationTypes.SubjectRelation,
                RelationTypes.ObjectRelation
            },
            new List<AsRelationTypes>()
            {
                AsRelationTypes.AsSubjectRelation
            }
        );

        var tree = new InteractTreeGrower(_dbContext, seed).Grow();

        Assert.IsNotNull(tree);
        Assert.AreEqual(tree.Count, 1);
        var genzhuHasChildRoot = tree.FirstOrDefault().Children;
        Assert.AreEqual(1, genzhuHasChildRoot.Count);
        var genzhuChildren = genzhuHasChildRoot.FirstOrDefault().Children;
        Assert.AreEqual(3, genzhuChildren.Count);
        Assert.IsTrue(genzhuChildren.Any(i => i.InteractionId == liz.Id));
        Assert.IsTrue(genzhuChildren.Any(i => i.InteractionId == yangYang.Id));
        var yangyangChildrenRelation = genzhuChildren.FirstOrDefault(i => i.InteractionId == yangYang.Id).Children;
        Assert.AreEqual(1, yangyangChildrenRelation.Count);
        var yangyangChildren = yangyangChildrenRelation.FirstOrDefault().Children;
        Assert.AreEqual(2, yangyangChildren.Count);
    }

    // max nodes limit should work
    [TestMethod]
    public async Task MaxNodesLimitShouldWork()
    {
        var hasChildren = await CreateByName("Has children of");
        var liz = await CreateByName("Liz");
        var yangYang = await CreateByName("Yangyang");
        var genZhu = await CreateByName("Genzhu");
        var genZhuHasChildren = await AddMultipleChildrenToFather(genZhu, hasChildren, liz, yangYang);

        var seed = new InteractTreeSeed(
            new List<Interaction>()
            {
                genZhu
            },
            new List<RelationTypes>()
            {
                RelationTypes.SubjectRelation,
                RelationTypes.ObjectRelation
            },
            new List<AsRelationTypes>()
            {
                AsRelationTypes.AsSubjectRelation
            },
            new InteractionTreeOpt()
            {
                MaxBranches = 1
            }
        );

        var treeGrower = new InteractTreeGrower(_dbContext, seed);

        var tree = treeGrower.Grow();
        Assert.IsNotNull(tree);
        Assert.AreEqual(tree.Count, 1);
        var genzhuHasChildRoot1 = tree.FirstOrDefault().Children;
        Assert.AreEqual(1, genzhuHasChildRoot1.Count);
        
        treeGrower._maxNodes = 3;
        
        var tree2 = treeGrower.Grow();
        Assert.IsNotNull(tree2);
        Assert.AreEqual(tree2.Count, 1);
        var genzhuHasChildRoot2 = tree2.FirstOrDefault().Children;
        Assert.AreEqual(1, genzhuHasChildRoot2.Count);
        var genzhuChildren = genzhuHasChildRoot2.FirstOrDefault().Children;
        Assert.AreEqual(3, genzhuChildren.Count);
        
        
    }
}