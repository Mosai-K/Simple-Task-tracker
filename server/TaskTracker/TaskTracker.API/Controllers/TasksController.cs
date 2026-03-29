using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Data;
using Task = TaskTracker.API.Models.Task;

namespace TaskTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController: ControllerBase
{
    private readonly ApplicationDbContext _context;
    public TasksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<List<Task>> GetTasks()
    {
        return await _context.Tasks.OrderByDescending(task => task.CreatedAt)
            .ToListAsync();
    }
    
    [HttpPost]
    public async Task<ActionResult<Task>> CreateTask(Task task)
    {
        task.CreatedAt = DateTime.UtcNow;
        task.UpdatedAt = DateTime.UtcNow;

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Task>> GetTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
            return NotFound();

        return task;
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, Task updatedTask)
    {
        var existing = await _context.Tasks.FindAsync(id);

        if (existing == null)
            return NotFound();

        existing.Title = updatedTask.Title;
        existing.Description = updatedTask.Description;
        existing.Status = updatedTask.Status;
        existing.Priority = updatedTask.Priority;
        existing.DueDate = updatedTask.DueDate;
        existing.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
            return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    
}