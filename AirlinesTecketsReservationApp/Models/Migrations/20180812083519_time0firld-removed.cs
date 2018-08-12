using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AirlinesTicketsReservationApp.Models.Migrations
{
    public partial class time0firldremoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Flights");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Flights",
                newName: "DateTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Flights",
                newName: "Date");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Time",
                table: "Flights",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
