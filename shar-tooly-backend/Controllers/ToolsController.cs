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

    [HttpGet("search")]
    public async Task<List<Tool>> Search([FromQuery] string? query)
    {
        if (query is null)
        {
            return await _context.Tools.ToListAsync();
        }

        return await _context.Tools
            .Where(tool => tool.Name.Contains(query))
            .ToListAsync();
    }

    [HttpGet("user/{userId}")]
    public async Task<List<Tool>> GetOwnedToolsByUserId(string userId)
    {
        return await _context.Tools
            .Where(tool => tool.OwnerId == userId)
            .ToListAsync();
    }

    [HttpGet("user/borrowed/{userId}")]
    public async Task<List<Tool>> GetBorrowedToolsByUserId(string userId)
    {
        return await _context.Tools
            .Where(tool => tool.RenterId == userId)
            .ToListAsync();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Tool>> BorrowTool(string id, [FromQuery] string userId)
    {
        if (id is null)
        {
            return NotFound();
        }

        var tool = _context.Tools.Find(id);

        if (tool is null)
        {
            return NotFound();
        }

        tool.RenterId = userId;
        tool.IsAvailable = false;

        _context.Tools.Update(tool);
        await _context.SaveChangesAsync();

        return tool;
    }

    [HttpPut("return/{id}")]
    public async Task<ActionResult<Tool>> ReturnTool(string id)
    {
        if (id is null)
        {
            return NotFound();
        }

        var tool = _context.Tools.Find(id);

        if (tool is null)
        {
            return NotFound();
        }

        tool.RenterId = null;
        tool.IsAvailable = true;

        _context.Tools.Update(tool);
        await _context.SaveChangesAsync();

        return tool;
    }

    [HttpPost]
    public async Task<ActionResult<Tool>> Create([FromForm] ToolRequest toolRequest, [FromQuery] string userId)
    {

        string imageUrl = string.Empty;

        if (toolRequest.Image != null)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "../shar-tooly-frontend/public/localBlob", toolRequest.Image.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await toolRequest.Image.CopyToAsync(stream);
            }
            imageUrl = $"{toolRequest.Image.FileName}";
        }
        var tool = new Tool
        {
            Id = Guid.NewGuid().ToString(),
            OwnerId = userId,
            Model = toolRequest.Model,
            Name = toolRequest.Name,
            Description = toolRequest.Description,
            ImageName = imageUrl,
            IsAvailable = true,
        };

        _context.Tools.Add(tool);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = tool.Id }, tool);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        if (id is null)
        {
            return NotFound();
        }

        var tool = _context.Tools.Find(id);

        if (tool is null)
        {
            return NotFound();
        }

        _context.Tools.Remove(tool);
        await _context.SaveChangesAsync();

        //remove image from localBlob
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "../shar-tooly-frontend/public/localBlob", tool.ImageName ?? string.Empty);
        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }

        return NoContent();
    }
}

