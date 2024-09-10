namespace SharToolyBackend.Models;
public class Tool()
{
    public required string Id { get; set; }
    public required string Model { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public string? ImageName { get; set; }
}