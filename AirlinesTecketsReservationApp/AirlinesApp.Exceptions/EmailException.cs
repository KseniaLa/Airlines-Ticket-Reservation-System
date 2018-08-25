using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace AirlinesApp.Exceptions
{
    public class EmailException : Exception
    {
         public EmailException()
         { }

         public EmailException(string message) : base(message)
         { }
     }
}