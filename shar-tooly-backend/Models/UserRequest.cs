using System.ComponentModel.DataAnnotations;

namespace SharToolyBackend.Models;
public class UserRequest()
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}