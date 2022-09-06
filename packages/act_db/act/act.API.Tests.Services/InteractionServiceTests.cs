using act.API.Tests.Controllers;
using act.Services.Contracts;
using act.Services.Model;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace act.API.Tests.Services;

[TestClass]
public class InteractionServiceTests : TestBase
{
    //NOTE: should be replaced by an interface
    private readonly IInteractionService _service;

    public InteractionServiceTests()
    {
        _service = _serviceProvider.GetRequiredService<IInteractionService>();
    }

    [TestMethod]
    public async Task Service_Works()
    {
        var result = await _service.Test();

        Assert.IsTrue(result);
    }

    [TestMethod]
    public async Task CreateRelation()
    {
        var result = await _service.CreateNewInteraction("Test");
        Assert.AreEqual(3, result.Id);
    }

    [TestMethod]
    public async Task AddRelations()
    {
        var interaction1 = await _service.CreateNewInteraction("Test 1");
        var interaction2 = await _service.CreateNewInteraction("Test 2");
        var subjectList = new List<Interaction> { interaction1 };
        var objectList = new List<Interaction> { interaction2 };
        var result = await _service.CreateInteraction(
            subjectList,
            "haha",
            objectList
        );
        Assert.AreEqual("haha", result.Description);
        Assert.AreEqual(interaction1.Id, result.Subjects.First().LinkedInteraction.Id);
        Assert.AreEqual(interaction2.Id, result.Objects.First().LinkedInteraction.Id);
    }
    
    // [TestMethod]
    // public async Task Update_Sentence_Should_work()
    // {
    //     var interaction = await _service.CreateNewInteraction("Sample sentence");
    //     var subjectInteract = await _service.CreateNewInteraction("Qian Xuesen");
    //     var subject2Interact = await _service.CreateNewInteraction("Xu Guozhi");
    //     // add subject
    //     var subject = await _service.CreateInteraction(
    //         new List<Interaction> { interaction },
    //         "subject",
    //         new List<Interaction> { subjectInteract }
    //     );
    //     
    // }
}