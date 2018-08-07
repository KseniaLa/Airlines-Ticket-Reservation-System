CREATE TABLE [dbo].[Tickets] (
    [TicketID]  INT            IDENTITY (1, 1) NOT NULL,
    [FlightID]  INT            NOT NULL,
    [Category]  NVARCHAR (50)  NOT NULL,
    [CompanyID] INT            NOT NULL,
    [Price]     DECIMAL (8, 2) NOT NULL,
    [Count]     INT            NOT NULL,
    CONSTRAINT [PK_Tickets] PRIMARY KEY CLUSTERED ([TicketID] ASC),
    CONSTRAINT [FK_Tickets_Companies] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Companies] ([CompanyID]),
    CONSTRAINT [FK_Tickets_Flights] FOREIGN KEY ([FlightID]) REFERENCES [dbo].[Flights] ([FlightID])
);

