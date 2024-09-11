using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SharToolyBackend.Models;
public class Tool()
{
    public required string Id { get; set; }
    [Required]
    public required string Model { get; set; }
    [Required]

    [ForeignKey("User")]
    public required string OwnerId { get; set; }

    [ForeignKey("User")]
    public string? RenterId { get; set; }

    public required string Name { get; set; }
    public string? Description { get; set; }
    public string? ImageName { get; set; }
}