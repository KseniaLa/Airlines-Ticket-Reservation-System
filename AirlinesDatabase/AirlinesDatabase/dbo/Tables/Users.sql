CREATE TABLE [dbo].[Users] (
    [UserID]       INT             IDENTITY (1, 1) NOT NULL,
    [Name]         NVARCHAR (50)   NOT NULL,
    [Surname]      NVARCHAR (50)   NOT NULL,
    [Email]        NVARCHAR (50)   NOT NULL,
    [PasswordHash] VARBINARY (MAX) NOT NULL,
    [PasswordSalt] VARBINARY (MAX) NOT NULL,
    [IsAdmin]      BIT             CONSTRAINT [DF_Users_IsAdmin] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserID] ASC)
);

