using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace act.Repositories.Db.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "SubjectRelations",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                table: "SubjectRelations",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ParallelRelations",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                table: "ParallelRelations",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ObjectRelations",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                table: "ObjectRelations",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Uuid",
                table: "Interactions",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.UpdateData(
                table: "InteractionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Guid",
                value: new Guid("bf3f93bd-2ed9-49f2-a0e3-9d9ac91422fc"));

            migrationBuilder.UpdateData(
                table: "Interactions",
                keyColumn: "Id",
                keyValue: 1,
                column: "Uuid",
                value: new Guid("74ebc892-15d3-4cb0-aa78-9a233bb2cd78"));

            migrationBuilder.UpdateData(
                table: "Interactions",
                keyColumn: "Id",
                keyValue: 2,
                column: "Uuid",
                value: new Guid("25932952-a212-4f2f-9cde-d5d03b10017c"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Uuid",
                table: "SubjectRelations");

            migrationBuilder.DropColumn(
                name: "Uuid",
                table: "ParallelRelations");

            migrationBuilder.DropColumn(
                name: "Uuid",
                table: "ObjectRelations");

            migrationBuilder.DropColumn(
                name: "Uuid",
                table: "Interactions");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "SubjectRelations",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "ParallelRelations",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "ObjectRelations",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.UpdateData(
                table: "InteractionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Guid",
                value: new Guid("a56526bc-c109-4b0d-a9c3-8493d0b48fca"));
        }
    }
}
