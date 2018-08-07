CREATE TABLE [dbo].[Flights] (
    [FlightID]      INT      NOT NULL,
    [DepartureID]   INT      NOT NULL,
    [DestinationID] INT      NOT NULL,
    [Date]          DATE     NOT NULL,
    [Time]          TIME (7) NOT NULL,
    CONSTRAINT [PK_Flights] PRIMARY KEY CLUSTERED ([FlightID] ASC),
    CONSTRAINT [FK_Flights_Cities] FOREIGN KEY ([DepartureID]) REFERENCES [dbo].[Cities] ([CityID]),
    CONSTRAINT [FK_Flights_Cities1] FOREIGN KEY ([DestinationID]) REFERENCES [dbo].[Cities] ([CityID])
);

