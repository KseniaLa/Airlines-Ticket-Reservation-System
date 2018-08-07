CREATE TABLE [dbo].[Orders] (
    [OrderID]  INT IDENTITY (1, 1) NOT NULL,
    [UserID]   INT NOT NULL,
    [TicketID] INT NOT NULL,
    [Count]    INT NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([OrderID] ASC),
    CONSTRAINT [FK_Orders_Tickets] FOREIGN KEY ([TicketID]) REFERENCES [dbo].[Tickets] ([TicketID]),
    CONSTRAINT [FK_Orders_Users] FOREIGN KEY ([UserID]) REFERENCES [dbo].[Users] ([UserID])
);

