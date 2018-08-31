using System.Threading.Tasks;

namespace AirlinesApp.TokenManager
{
     public interface ITokenManager
     {
          Task<bool> IsCurrentActiveToken();
          Task DeactivateCurrentAsync();
          Task<bool> IsActiveAsync(string token);
          Task DeactivateAsync(string token);
     }
}
