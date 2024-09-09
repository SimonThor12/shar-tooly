namespace shar_tooly_backend.Data;
using Microsoft.EntityFrameworkCore;
using SharToolyBackend.Models;
public class ToolContext : DbContext
{
    public ToolContext(DbContextOptions<ToolContext> options) : base(options)
    {
    }

    public DbSet<Tool> Tools { get; set; }
}