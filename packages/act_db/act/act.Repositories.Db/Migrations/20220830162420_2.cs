using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace act.Repositories.Db.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "InteractionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Guid",
                value: new Guid("a56526bc-c109-4b0d-a9c3-8493d0b48fca"));

            migrationBuilder.InsertData(
                table: "Interactions",
                columns: new[] { "Id", "Description", "End", "Identity", "Label", "Start", "TypeId" },
                values: new object[] { 2, "", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "People", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Interactions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "InteractionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Guid",
                value: new Guid("caad93de-176f-4bba-bc76-f46294c80d30"));
        }
    }
}
