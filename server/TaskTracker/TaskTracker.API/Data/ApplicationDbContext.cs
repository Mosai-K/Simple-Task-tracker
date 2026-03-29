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
}