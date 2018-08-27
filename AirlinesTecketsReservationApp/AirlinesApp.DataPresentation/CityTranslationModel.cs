using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.DataPresentation
{
    public class CityTranslationModel
    {
         public int Id { get; set; }
         public string Name { get; set; }
         public List<TranslationModel> Translations { get; set; }
    }
}
