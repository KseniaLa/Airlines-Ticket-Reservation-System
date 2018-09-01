using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.DataPresentation
{
    public class LocationModel
    {
         public int Id { get; set; }
         public string Name { get; set; }
         public List<TranslationModel> Translations { get; set; }
    }
}
