using AutoMapper;
using act.API.DataContracts;
using act.API.DataContracts.Requests;
using act.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using S = act.Services.Model;

namespace act.API.Controllers.V2
{
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/users")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IInteractionService _service;
        private readonly IMapper _mapper;

#pragma warning disable CS1591
        public UserController(IInteractionService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }
#pragma warning restore CS1591

        #region GET
        /// <summary>
        /// Comments and descriptions can be added to every endpoint using XML comments.
        /// </summary>
        /// <remarks>
        /// XML comments included in controllers will be extracted and injected in Swagger/OpenAPI file.
        /// </remarks>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<InteractionDto> Get(int id)
        {
            var data = await _service.GetAsync(id);

            if (data != null)
                return _mapper.Map<InteractionDto>(data);
            else
                return null;
        }
        #endregion

        #region POST
        [HttpPost]
        public async Task<InteractionDto> CreateUser([FromBody]UserCreationRequest value)
        {

            //TODO: include exception management policy according to technical specifications
            if (value == null)
                throw new ArgumentNullException("value");

            if (value == null)
                throw new ArgumentNullException("value.User");


            var data = await _service.CreateAsync(_mapper.Map<S.Interaction>(value.InteractionDto));

            if (data != null)
                return _mapper.Map<InteractionDto>(data);
            else
                return null;

        }
        #endregion

        #region PUT
        [HttpPut()]
        public async Task<bool> UpdateUser(InteractionDto parameter)
        {
            if (parameter == null)
                throw new ArgumentNullException("parameter");

            return await _service.UpdateAsync(_mapper.Map<S.Interaction>(parameter));
        }
        #endregion

        #region DELETE
        [HttpDelete("{id}")]
        public async Task<bool> DeleteDevice(int id)
        {
            return await _service.DeleteAsync(id);
        }
        #endregion
    }
}
