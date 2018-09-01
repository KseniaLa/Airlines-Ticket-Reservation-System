using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.Exceptions
{
    public class UnauthorizedException : Exception
    {
         public UnauthorizedException()
         { }

         public UnauthorizedException(string message) : base(message)
         { }
     }
}
