using System;
using System.Threading.Tasks;
using act.API.DataContracts;
using act.API.DataContracts.Requests;
using act.Services.Contracts;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Attributes;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.Extensions.Logging;
using S = act.Services.Model;

namespace act.API.Controllers.V1;

[ApiVersion("1.0")]
[Route("api/acts")] //required for default versioning
[Route("api/v{version:apiVersion}/acts")]
[ODataRouteComponent]
[ApiController]
public class InteractionController : ODataController
{
    private readonly ILogger<InteractionController> _logger;
    private readonly IMapper _mapper;
    private readonly IInteractionService _service;

#pragma warning disable CS1591
    public InteractionController(IInteractionService service, IMapper mapper, ILogger<InteractionController> logger)
    {
        _service = service;
        _mapper = mapper;
        _logger = logger;
    }
#pragma warning restore CS1591

    #region Swagger Endpoint

    [HttpGet("swagger.json")]

    #endregion Swagger Endpoint

    #region GET

    [HttpGet("")]
    [EnableQuery]
    public IActionResult Get()
    {
        return Ok(_service.GetAllInteractions());
    }

    // /// <summary>
    // /// Returns a user entity according to the provided Id.
    // /// </summary>
    // /// <remarks>
    // /// XML comments included in controllers will be extracted and injected in Swagger/OpenAPI file.
    // /// </remarks>
    // /// <param name="id"></param>
    // /// <returns>
    // /// Returns a user entity according to the provided Id.
    // /// </returns>
    // /// <response code="201">Returns the newly created item.</response>
    // /// <response code="204">If the item is null.</response>
    // [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InteractionDto))]
    // [ProducesResponseType(StatusCodes.Status204NoContent, Type = typeof(InteractionDto))]
    // [HttpGet("{id}")]
    // public async Task<InteractionDto> Get(int id)
    // {
    //     _logger.LogDebug($"UserControllers::Get::{id}");
    //
    //     var data = await _service.GetAsync(id);
    //
    //     if (data != null)
    //         return _mapper.Map<InteractionDto>(data);
    //     else
    //         return null;
    // }

    #endregion

    #region POST

    /// <summary>
    ///     Creates a user.
    /// </summary>
    /// <remarks>
    /// </remarks>
    /// <param name="value"></param>
    /// <returns>A newly created user.</returns>
    /// <response code="201">Returns the newly created item.</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InteractionDto))]
    public async Task<InteractionDto> CreateUser([FromBody] UserCreationRequest value)
    {
        _logger.LogDebug("UserControllers::Post::");

        if (value == null)
            throw new ArgumentNullException("value");

        if (value.InteractionDto == null)
            throw new ArgumentNullException("value.User");


        var data = await _service.CreateAsync(_mapper.Map<S.Interaction>(value.InteractionDto));

        if (data != null)
            return _mapper.Map<InteractionDto>(data);
        return null;
    }

    #endregion

    #region PUT

    /// <summary>
    ///     Updates an user entity.
    /// </summary>
    /// <remarks>
    ///     No remarks.
    /// </remarks>
    /// <param name="parameter"></param>
    /// <returns>
    ///     Returns a boolean notifying if the user has been updated properly.
    /// </returns>
    /// <response code="200">Returns a boolean notifying if the user has been updated properly.</response>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
    public async Task<bool> UpdateUser(InteractionDto parameter)
    {
        if (parameter == null)
            throw new ArgumentNullException("parameter");

        return await _service.UpdateAsync(_mapper.Map<S.Interaction>(parameter));
    }

    #endregion

    #region DELETE

    /// <summary>
    ///     Deletes an user entity.
    /// </summary>
    /// <remarks>
    ///     No remarks.
    /// </remarks>
    /// <param name="id">User Id</param>
    /// <returns>
    ///     Boolean notifying if the user has been deleted properly.
    /// </returns>
    /// <response code="200">Boolean notifying if the user has been deleted properly.</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
    public async Task<bool> DeleteDevice(int id)
    {
        return await _service.DeleteAsync(id);
    }

    #endregion

    #region Exceptions

    [HttpGet("exception/{message}")]
    [ProducesErrorResponseType(typeof(Exception))]
    public async Task RaiseException(string message)
    {
        _logger.LogDebug($"UserControllers::RaiseException::{message}");

        throw new Exception(message);
    }

    #endregion
}