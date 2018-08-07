CREATE TABLE [dbo].[PopularCities] (
    [ID]     INT IDENTITY (1, 1) NOT NULL,
    [CityID] INT NOT NULL,
    [Rating] INT NOT NULL,
    CONSTRAINT [PK_PopularCities] PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_PopularCities_Cities] FOREIGN KEY ([CityID]) REFERENCES [dbo].[Cities] ([CityID])
);

