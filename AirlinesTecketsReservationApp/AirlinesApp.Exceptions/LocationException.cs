using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace AirlinesApp.Exceptions
{
     public class LocationException : Exception
     {
          public LocationException()
          { }

          public LocationException(string message) : base(message)
          { }
     }
}