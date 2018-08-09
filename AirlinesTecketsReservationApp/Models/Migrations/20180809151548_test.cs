using Microsoft.EntityFrameworkCore.Migrations;

namespace AirlinesTicketsReservationApp.Models.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Cities_CityId",
                table: "Translation");

            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Companies_CompanyId",
                table: "Translation");

            migrationBuilder.DropForeignKey(
                name: "FK_Translation_Languages_LanguageId",
                table: "Translation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Translation",
                table: "Translation");

            migrationBuilder.RenameTable(
                name: "Translation",
                newName: "Translations");

            migrationBuilder.RenameIndex(
                name: "IX_Translation_LanguageId",
                table: "Translations",
                newName: "IX_Translations_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_Translation_CompanyId",
                table: "Translations",
                newName: "IX_Translations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Translation_CityId",
                table: "Translations",
                newName: "IX_Translations_CityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Translations",
                table: "Translations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Translations_Cities_CityId",
                table: "Translations",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Translations_Companies_CompanyId",
                table: "Translations",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Translations_Languages_LanguageId",
                table: "Translations",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Translations_Cities_CityId",
                table: "Translations");

            migrationBuilder.DropForeignKey(
                name: "FK_Translations_Companies_CompanyId",
                table: "Translations");

            migrationBuilder.DropForeignKey(
                name: "FK_Translations_Languages_LanguageId",
                table: "Translations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Translations",
                table: "Translations");

            migrationBuilder.RenameTable(
                name: "Translations",
                newName: "Translation");

            migrationBuilder.RenameIndex(
                name: "IX_Translations_LanguageId",
                table: "Translation",
                newName: "IX_Translation_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_Translations_CompanyId",
                table: "Translation",
                newName: "IX_Translation_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Translations_CityId",
                table: "Translation",
                newName: "IX_Translation_CityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Translation",
                table: "Translation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Cities_CityId",
                table: "Translation",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Companies_CompanyId",
                table: "Translation",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Translation_Languages_LanguageId",
                table: "Translation",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
