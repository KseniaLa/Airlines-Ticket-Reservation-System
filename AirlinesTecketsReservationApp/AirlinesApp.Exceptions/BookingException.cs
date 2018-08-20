using System;

namespace AirlinesApp.Exceptions
{
     public class BookingException : Exception
     {
          public BookingException()
          { }

          public BookingException(string message) : base(message)
          { }

     }
}
