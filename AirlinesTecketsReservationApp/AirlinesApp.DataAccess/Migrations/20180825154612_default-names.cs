using Microsoft.EntityFrameworkCore.Migrations;

namespace AirlinesApp.DataAccess.Migrations
{
    public partial class defaultnames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Default",
                table: "Companies",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Default",
                table: "Cities",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Default",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Default",
                table: "Cities");
        }
    }
}
