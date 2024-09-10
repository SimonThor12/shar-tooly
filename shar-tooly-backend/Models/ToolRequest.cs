namespace SharToolyBackend.Models;
public class ToolRequest()
{
    public required string Model { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public IFormFile? Image { get; set; }
}