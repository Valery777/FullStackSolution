using Microsoft.EntityFrameworkCore;
using NextJS1.Domain.Entities;

namespace NextJS1.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products => Set<Product>();

    }
}
