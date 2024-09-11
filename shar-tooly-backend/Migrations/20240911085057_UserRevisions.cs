using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shar_tooly_backend.Migrations
{
    /// <inheritdoc />
    public partial class UserRevisions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Tools",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Tools",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Tools",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tools_Users_UserId",
                table: "Tools");

            migrationBuilder.DropForeignKey(
                name: "FK_Tools_Users_UserId1",
                table: "Tools");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Tools_UserId",
                table: "Tools");

            migrationBuilder.DropIndex(
                name: "IX_Tools_UserId1",
                table: "Tools");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Tools");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Tools");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Tools");
        }
    }
}
