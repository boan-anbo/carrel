using AutoMapper;
using DC = act.API.DataContracts;
using S = act.Services.Model;

namespace act.IoC.Configuration.AutoMapper.Profiles
{
    public class APIMappingProfile : Profile
    {
        public APIMappingProfile()
        {
            CreateMap<DC.InteractionDto, S.Interaction>().ReverseMap();
            CreateMap<DC.Address, S.SubjectRelation>().ReverseMap();
        }
    }
}
