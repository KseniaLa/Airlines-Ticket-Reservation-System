using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.Config
{
    public interface IConfig
    {
        int SaltSize { get; }
        int IterationsCount { get; }
        int HashedPassSize { get; }
        string ServerName { get; }
        string Audience { get; }
        int Lifetime { get; }
        string ConnectionString { get; }
    }
}
