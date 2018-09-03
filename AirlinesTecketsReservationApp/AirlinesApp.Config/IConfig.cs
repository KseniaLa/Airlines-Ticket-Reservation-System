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
        string InitVector { get; }
        string Key { get; }
        int KeySize { get; }
    }
}
