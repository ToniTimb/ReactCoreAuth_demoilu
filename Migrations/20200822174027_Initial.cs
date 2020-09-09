using Microsoft.EntityFrameworkCore.Migrations;

namespace reactCoreAuth.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Laskut",
                columns: table => new
                {
                    LaskuId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LaskuNro = table.Column<string>(maxLength: 50, nullable: false),
                    Tunniste = table.Column<string>(maxLength: 50, nullable: true),
                    Tiedosto = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laskut", x => x.LaskuId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Laskut");
        }
    }
}
