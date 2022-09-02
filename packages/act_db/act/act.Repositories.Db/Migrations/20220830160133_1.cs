using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace act.Repositories.Db.Migrations
{
    public partial class _1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InteractionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Guid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InteractionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Interactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Label = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Identity = table.Column<int>(type: "INTEGER", nullable: false),
                    TypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Start = table.Column<DateTime>(type: "TEXT", nullable: true),
                    End = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interactions_InteractionTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "InteractionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ObjectRelations",
                columns: table => new
                {
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectRelations", x => new { x.HostInteractionId, x.LinkedInteractionId });
                    table.ForeignKey(
                        name: "FK_ObjectRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ObjectRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParallelRelations",
                columns: table => new
                {
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParallelRelations", x => new { x.HostInteractionId, x.LinkedInteractionId });
                    table.ForeignKey(
                        name: "FK_ParallelRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ParallelRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Guid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Key = table.Column<string>(type: "TEXT", nullable: true),
                    Value = table.Column<string>(type: "TEXT", nullable: true),
                    InteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Properties_Interactions_InteractionId",
                        column: x => x.InteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SubjectRelations",
                columns: table => new
                {
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectRelations", x => new { x.HostInteractionId, x.LinkedInteractionId });
                    table.ForeignKey(
                        name: "FK_SubjectRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubjectRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "InteractionTypes",
                columns: new[] { "Id", "Description", "Guid", "Label" },
                values: new object[] { 1, null, new Guid("caad93de-176f-4bba-bc76-f46294c80d30"), "to be" });

            migrationBuilder.InsertData(
                table: "Interactions",
                columns: new[] { "Id", "Description", "End", "Identity", "Label", "Start", "TypeId" },
                values: new object[] { 1, "", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "World", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Interactions_TypeId",
                table: "Interactions",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ObjectRelations_LinkedInteractionId",
                table: "ObjectRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_ParallelRelations_LinkedInteractionId",
                table: "ParallelRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_InteractionId",
                table: "Properties",
                column: "InteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectRelations_LinkedInteractionId",
                table: "SubjectRelations",
                column: "LinkedInteractionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ObjectRelations");

            migrationBuilder.DropTable(
                name: "ParallelRelations");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "SubjectRelations");

            migrationBuilder.DropTable(
                name: "Interactions");

            migrationBuilder.DropTable(
                name: "InteractionTypes");
        }
    }
}
