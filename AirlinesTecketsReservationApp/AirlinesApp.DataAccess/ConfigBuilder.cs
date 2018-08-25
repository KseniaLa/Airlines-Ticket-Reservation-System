using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace AirlinesApp.DataAccess
{
     public static class ConfigBuilder
     {

          public static IConfigurationBuilder GetBuilder(string path)
          {
               return new ConfigurationBuilder()
                    .SetBasePath(path)
                    .AddJsonFile("appsettings.json");
          }

          public static IConfigurationRoot GetConfigRoot(string path)
          {
               return new ConfigurationBuilder()
                    .SetBasePath(path)
                    .AddJsonFile("appsettings.json").Build();
          }
     }
}