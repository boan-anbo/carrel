using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace act.Repositories.Db.Migrations
{
    public partial class reformated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FirstActs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Guid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FirstActs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SecondActs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Guid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecondActs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Interactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Identity = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstActId = table.Column<int>(type: "INTEGER", nullable: false),
                    SecondActId = table.Column<int>(type: "INTEGER", nullable: true),
                    Start = table.Column<DateTime>(type: "TEXT", nullable: true),
                    End = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interactions_FirstActs_FirstActId",
                        column: x => x.FirstActId,
                        principalTable: "FirstActs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Interactions_SecondActs_SecondActId",
                        column: x => x.SecondActId,
                        principalTable: "SecondActs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContextRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContextRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContextRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContextRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IndirectObjectRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndirectObjectRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IndirectObjectRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_IndirectObjectRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ObjectRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectRelations", x => x.Id);
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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParallelRelations", x => x.Id);
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
                    Description = table.Column<string>(type: "TEXT", nullable: true),
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
                name: "PurposeRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurposeRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurposeRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurposeRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReferenceRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReferenceRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReferenceRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReferenceRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SettingRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SettingRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SettingRelations_Interactions_HostInteractionId",
                        column: x => x.HostInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SettingRelations_Interactions_LinkedInteractionId",
                        column: x => x.LinkedInteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubjectRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uuid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    HostInteractionId = table.Column<int>(type: "INTEGER", nullable: false),
                    LinkedInteractionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectRelations", x => x.Id);
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
                table: "FirstActs",
                columns: new[] { "Id", "Content", "Description", "Guid", "Label" },
                values: new object[] { 1, "", "", new Guid("e8a0bd10-60e0-4d43-b67c-cbd2677eda3e"), "to be" });

            migrationBuilder.InsertData(
                table: "Interactions",
                columns: new[] { "Id", "Content", "Description", "End", "FirstActId", "Identity", "Label", "SecondActId", "Start", "Uuid" },
                values: new object[] { 1, "", "", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, "World", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("3415e73c-b09a-4bec-899e-b67cfa09b6f9") });

            migrationBuilder.InsertData(
                table: "Interactions",
                columns: new[] { "Id", "Content", "Description", "End", "FirstActId", "Identity", "Label", "SecondActId", "Start", "Uuid" },
                values: new object[] { 2, "", "", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, "People", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("77c89f02-7337-4f46-8696-41296af09164") });

            migrationBuilder.InsertData(
                table: "Interactions",
                columns: new[] { "Id", "Content", "Description", "End", "FirstActId", "Identity", "Label", "SecondActId", "Start", "Uuid" },
                values: new object[] { 3, "", "", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, "Idea", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("1431edd8-3e85-41b9-b817-e805b3ada850") });

            migrationBuilder.InsertData(
                table: "Interactions",
                columns: new[] { "Id", "Content", "Description", "End", "FirstActId", "Identity", "Label", "SecondActId", "Start", "Uuid" },
                values: new object[] { 4, "", "", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, "Creation", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("0c39620e-0bb2-4a3f-bef0-84b24b09c253") });

            migrationBuilder.CreateIndex(
                name: "IX_ContextRelations_HostInteractionId",
                table: "ContextRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_ContextRelations_LinkedInteractionId",
                table: "ContextRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_IndirectObjectRelations_HostInteractionId",
                table: "IndirectObjectRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_IndirectObjectRelations_LinkedInteractionId",
                table: "IndirectObjectRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_Interactions_FirstActId",
                table: "Interactions",
                column: "FirstActId");

            migrationBuilder.CreateIndex(
                name: "IX_Interactions_SecondActId",
                table: "Interactions",
                column: "SecondActId");

            migrationBuilder.CreateIndex(
                name: "IX_ObjectRelations_HostInteractionId",
                table: "ObjectRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_ObjectRelations_LinkedInteractionId",
                table: "ObjectRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_ParallelRelations_HostInteractionId",
                table: "ParallelRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_ParallelRelations_LinkedInteractionId",
                table: "ParallelRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_InteractionId",
                table: "Properties",
                column: "InteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_PurposeRelations_HostInteractionId",
                table: "PurposeRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_PurposeRelations_LinkedInteractionId",
                table: "PurposeRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_ReferenceRelations_HostInteractionId",
                table: "ReferenceRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_ReferenceRelations_LinkedInteractionId",
                table: "ReferenceRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_SettingRelations_HostInteractionId",
                table: "SettingRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_SettingRelations_LinkedInteractionId",
                table: "SettingRelations",
                column: "LinkedInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectRelations_HostInteractionId",
                table: "SubjectRelations",
                column: "HostInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectRelations_LinkedInteractionId",
                table: "SubjectRelations",
                column: "LinkedInteractionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContextRelations");

            migrationBuilder.DropTable(
                name: "IndirectObjectRelations");

            migrationBuilder.DropTable(
                name: "ObjectRelations");

            migrationBuilder.DropTable(
                name: "ParallelRelations");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "PurposeRelations");

            migrationBuilder.DropTable(
                name: "ReferenceRelations");

            migrationBuilder.DropTable(
                name: "SettingRelations");

            migrationBuilder.DropTable(
                name: "SubjectRelations");

            migrationBuilder.DropTable(
                name: "Interactions");

            migrationBuilder.DropTable(
                name: "FirstActs");

            migrationBuilder.DropTable(
                name: "SecondActs");
        }
    }
}
