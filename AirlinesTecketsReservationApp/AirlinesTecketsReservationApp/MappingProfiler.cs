using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataPresentation;
using AutoMapper;

namespace AirlinesTicketsReservationApp
{
     public class MappingProfile : Profile
     {
          public MappingProfile()
          {
               CreateMap<SignupModel, User>()
                    .ForMember("PasswordHash", opt => opt.MapFrom(u => u.Password));
               CreateMap<IpAddress, IpAddressModel>();
          }
     }
}
