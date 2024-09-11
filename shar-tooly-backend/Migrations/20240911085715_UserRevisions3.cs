using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shar_tooly_backend.Migrations
{
    /// <inheritdoc />
    public partial class UserRevisions3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Tools");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Tools",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
