CREATE TABLE [dbo].[Companies] (
    [CompanyID] INT           NOT NULL,
    [NameRU]    NVARCHAR (50) NOT NULL,
    [NameEN]    NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Companies] PRIMARY KEY CLUSTERED ([CompanyID] ASC)
);

