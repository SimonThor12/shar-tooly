using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shar_tooly_backend.Data;
using SharToolyBackend.Models;

namespace shar_tooly_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(ToolContext context) : ControllerBase
{
    private readonly ToolContext _context = context;


    [HttpGet]
    public async Task<List<User>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<User> GetUserById(string id)
    {
        return await _context.Users.FindAsync(id);
    }
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] UserRequest userRequest)
    {
        var user = new User
        {
            Id = "User_" + Guid.NewGuid().ToString(),
            Username = userRequest.Username,
            Password = userRequest.Password
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

}