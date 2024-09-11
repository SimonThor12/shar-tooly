using System.ComponentModel.DataAnnotations;

namespace SharToolyBackend.Models;
public class User()
{
    [Key]
    public required string Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
}