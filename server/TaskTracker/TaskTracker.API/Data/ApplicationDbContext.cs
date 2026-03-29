using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Models;
using Task = TaskTracker.API.Models.Task;

namespace TaskTracker.API.Data;

public class ApplicationDbContext: DbContext
{
    public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options)
        : base(options)
    { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Task> Tasks => Set<Task>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Task>().HasData(
            new Task 
            {
                Id = 1,
                Title = "Design new landing page",
                Description = "Create mockups and prototypes for the new company landing page",
                Status = "in-progress",
                Priority = "high",
                CreatedAt = new DateTime(2026, 3, 1),
                UpdatedAt = new DateTime(2026, 3, 5),
                DueDate = new DateTime(2026, 4, 1),
            }, 
            new Task 
            {
                Id = 2,
                Title = "Update API documentation",
                Description = "Document all new endpoints added in the last sprint",
                Status = "completed",
                Priority = "medium",
                CreatedAt = new DateTime(2026, 3, 27),
                UpdatedAt = new DateTime(2026, 3, 30),
                DueDate = new DateTime(2026, 5, 1),
            },
            new Task 
            {
                Id = 3,
                Title = "Fix login bug",
                Description = "Users are reporting issues with password reset functionality",
                Status = "in-progress",
                Priority = "high",
                CreatedAt = new DateTime(2026, 2, 1),
                UpdatedAt = new DateTime(2026, 2, 25),
                DueDate = new DateTime(2026, 3, 1),
            }
        );
    }
}