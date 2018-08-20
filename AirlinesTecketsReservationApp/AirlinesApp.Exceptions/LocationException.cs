using System;

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