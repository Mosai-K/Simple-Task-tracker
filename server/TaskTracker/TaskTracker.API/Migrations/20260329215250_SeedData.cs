using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskTracker.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "CreatedAt", "Description", "DueDate", "Priority", "Status", "Title", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 3, 29, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(830), "Create mockups and prototypes for the new company landing page", new DateTime(2026, 4, 5, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(1030), "high", "in-progress", "Design new landing page", new DateTime(2026, 3, 29, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(930) },
                    { 2, new DateTime(2026, 3, 29, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(1150), "Document all new endpoints added in the last sprint", new DateTime(2026, 3, 31, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(1150), "medium", "completed", "Update API documentation", new DateTime(2026, 3, 30, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(1150) },
                    { 3, new DateTime(2026, 3, 29, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(1150), "Users are reporting issues with password reset functionality", new DateTime(2026, 3, 29, 23, 53, 50, 84, DateTimeKind.Local).AddTicks(1150), "high", "in-progress", "Fix login bug", new DateTime(2026, 3, 29, 23, 52, 50, 84, DateTimeKind.Local).AddTicks(1150) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Tasks");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Tasks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");
        }
    }
}
