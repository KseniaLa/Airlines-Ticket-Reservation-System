using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataPresentation;

namespace AirlinesApp.Services.Interfaces
{
    public interface IAccountService
    {
        Task<User> TryAuthenticate(string email, string password);

        Task<User> SignUp(SignupModel registrationInfo);

        Task<User> GetUserByEmail(string email);

        Task<User> ConfirmEmail(string token);
    }
}
