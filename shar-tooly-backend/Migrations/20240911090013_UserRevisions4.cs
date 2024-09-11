using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shar_tooly_backend.Migrations
{
    /// <inheritdoc />
    public partial class UserRevisions4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tools_Users_UserId",
                table: "Tools");

            migrationBuilder.DropForeignKey(
                name: "FK_Tools_Users_UserId1",
                table: "Tools");

            migrationBuilder.DropIndex(
                name: "IX_Tools_UserId",
                table: "Tools");

            migrationBuilder.DropIndex(
                name: "IX_Tools_UserId1",
                table: "Tools");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Tools");

            migrationBuilder.RenameColumn(
                name: "UserId1",
                table: "Tools",
                newName: "RenterId");

            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Tools",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Tools");

            migrationBuilder.RenameColumn(
                name: "RenterId",
                table: "Tools",
                newName: "UserId1");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Tools",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tools_UserId",
                table: "Tools",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tools_UserId1",
                table: "Tools",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Tools_Users_UserId",
                table: "Tools",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tools_Users_UserId1",
                table: "Tools",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
