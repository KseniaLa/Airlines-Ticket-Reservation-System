using System;

namespace AirlinesApp.DataPresentation
{
    public class TranslationModel : IEquatable<TranslationModel>
    {
         public string Language { get; set; }
         public string Value { get; set; }

        public bool Equals(TranslationModel other)
        {
            if (other is null) return false;
            if (object.ReferenceEquals(this, other)) return true;
            return Language.Equals(other.Language);
        }

        public override int GetHashCode()
        {
            int hashLanguage = Language == null ? 0 : Language.GetHashCode();
            int hashValue = Value == null ? 0 : Value.GetHashCode();
            return hashLanguage;
        }
    }
}
