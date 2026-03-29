using System.ComponentModel.DataAnnotations;

namespace TaskTracker.API.Models;

public class Task
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "todo";
    public string Priority { get; set; } = "low";
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; } = DateTime.Now;
}