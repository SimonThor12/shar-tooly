using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shar_tooly_backend.Migrations
{
    /// <inheritdoc />
    public partial class Revisions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Tools",
                newName: "ImageName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageName",
                table: "Tools",
                newName: "ImageUrl");
        }
    }
}
