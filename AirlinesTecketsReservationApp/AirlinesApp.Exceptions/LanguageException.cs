using System;

namespace AirlinesApp.Exceptions
{
    public class LanguageException : Exception
    {
        public LanguageException()
        { }

        public LanguageException(string message) : base(message)
        { }
    }
}
