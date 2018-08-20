using Microsoft.EntityFrameworkCore.Migrations;

namespace AirlinesApp.DataAccess.Migrations
{
    public partial class unique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tickets_FlightId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Flights_DepartureId",
                table: "Flights");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Tickets",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_FlightId_CompanyId_Category",
                table: "Tickets",
                columns: new[] { "FlightId", "CompanyId", "Category" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_DepartureId_DestinationId_DateTime",
                table: "Flights",
                columns: new[] { "DepartureId", "DestinationId", "DateTime" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tickets_FlightId_CompanyId_Category",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Flights_DepartureId_DestinationId_DateTime",
                table: "Flights");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Tickets",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_FlightId",
                table: "Tickets",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_DepartureId",
                table: "Flights",
                column: "DepartureId");
        }
    }
}
