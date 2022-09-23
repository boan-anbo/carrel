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
[TestClass]
public class TreeDataConversionTest: TestBase
{

    private readonly IGraphQLMutation _mutationService;
    private readonly GraphQLQuery _queryService;
    private readonly IInteractionRepository _interactionRepo;
    private readonly IRelationRepository _relationRepo;
    private readonly InteractDbContext _dbContext;
    private readonly IInteractionService _interactionService;

    public TreeDataConversionTest()
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


        Branches branches = new Branches()
        {
            Roots = new[]
            {
                genZhu.Id
            },
            HasBranches = new List<RelationTypes>()
            {
                RelationTypes.ObjectRelation,
            },
            AsBranches = new List<AsRelationTypes>()
            {
                AsRelationTypes.AsSubjectRelation
            }
        };

        var seed = new InteractTreeSeed(branches);
        var tree = new InteractTreeGrower(_dbContext, seed).Grow();

        Assert.IsNotNull(tree);
        Assert.AreEqual(tree.Count, 1);
        var genzhuHasChildRoot = tree.FirstOrDefault().Children;
        Assert.AreEqual(1, genzhuHasChildRoot.Count);
        var genzhuChildren = genzhuHasChildRoot.FirstOrDefault().Children;
        Assert.AreEqual(genzhuChildren.Count, 2);
        Assert.IsTrue(genzhuChildren.Any(i => i.InteractionId == liz.Id));
        Assert.IsTrue(genzhuChildren.Any(i => i.InteractionId == yangYang.Id));
        var yangyangChildrenRelation = genzhuChildren.FirstOrDefault(i => i.InteractionId == yangYang.Id).Children;
        Assert.AreEqual(1, yangyangChildrenRelation.Count);
        var yangyangChildren = yangyangChildrenRelation.FirstOrDefault().Children;
        Assert.AreEqual(2, yangyangChildren.Count);

        // convert recursive tree data to flat tree data

        var flatTree = InteractTreeDataFlat.FromInteractTreeDataRecursive(tree);

        Assert.AreEqual(1, flatTree.Count);

        var genzhuHasChildRootFlat = flatTree.Any(flatTreeRoot => flatTreeRoot.Children.Any(child => child.Id == genzhuHasChildRoot.FirstOrDefault().Id));

        Assert.IsTrue(genzhuHasChildRootFlat);

        Assert.AreEqual(6, flatTree.FirstOrDefault().ChildrenCount);

    }


}
