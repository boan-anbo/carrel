using System;
using System.Threading.Tasks;
using act.API.Controllers.V1;
using act.API.DataContracts.Requests;
using act.Services.Contracts;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace act.API.Tests.Controllers.ControllerTests.V1;

[TestClass]
public class UserControllerTests : TestBase
{
    //NOTE: should be replaced by an interface
    private readonly InteractionController _controller;

    public UserControllerTests()
    {
        var businessService = _serviceProvider.GetRequiredService<IInteractionService>();
        var mapper = _serviceProvider.GetRequiredService<IMapper>();
        var loggerFactory = _serviceProvider.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger<InteractionController>();

        _controller = new InteractionController(businessService, mapper, logger);
    }

    [TestMethod]
    public async Task CreateUser_Nominal_OK()
    {
        //Simple test
    }
}
