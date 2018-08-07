﻿CREATE TABLE [dbo].[Cities] (
    [CityID] INT           IDENTITY (1, 1) NOT NULL,
    [NameRU] NVARCHAR (50) NOT NULL,
    [NameEN] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Cities] PRIMARY KEY CLUSTERED ([CityID] ASC)
);

