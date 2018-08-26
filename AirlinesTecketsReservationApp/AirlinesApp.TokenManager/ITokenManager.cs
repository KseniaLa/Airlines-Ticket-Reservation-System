using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AirlinesApp.TokenManager
{
    public interface ITokenManager
    {
         bool IsCurrentActiveToken();
         void DeactivateCurrent();
         bool IsActive(string token);
         void Deactivate(string token);
     }
}
