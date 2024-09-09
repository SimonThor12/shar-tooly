using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shar_tooly_backend.Data;
using SharToolyBackend.Models;

namespace shar_tooly_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ToolsController(ToolContext context) : ControllerBase
{
    private readonly ToolContext _context = context;

    [HttpGet]
    public async Task<List<Tool>> GetAll()
    {
        return await _context.Tools.ToListAsync();
    }

    [HttpGet("{id}")]
    public ActionResult<Tool> GetById(string? id)
    {
        if (id is null)
        {
            return NotFound();
        }

        return _context.Tools.Find(id)!;
    }

    [HttpPost]
    public async Task<Tool> Create(ToolRequest toolRequest)
    {
      
        var tool = new Tool
        {
            Id = Guid.NewGuid().ToString(),
            Model = toolRequest.Model,
            Name = toolRequest.Name,
            Description = toolRequest.Description,
            ImageUrl = toolRequest.ImageUrl
        };

        _context.Tools.Add(tool);
        await _context.SaveChangesAsync();

        return tool;
    }
}
