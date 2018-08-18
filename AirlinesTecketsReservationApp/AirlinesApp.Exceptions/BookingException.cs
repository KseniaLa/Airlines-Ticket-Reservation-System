using System;
using System.Collections.Generic;
using System.Text;

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
