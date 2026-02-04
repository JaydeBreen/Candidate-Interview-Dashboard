using Microsoft.EntityFrameworkCore;
using Candidate_Interview_Dashboard.Models;

namespace Candidate_Interview_Dashboard.Data
{
       public class AppDbContext : DbContext
        {
            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
            {
            }
            public DbSet<Candidate> Candidates { get; set; } = null!;
        }
}
