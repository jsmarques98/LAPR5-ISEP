using Microsoft.EntityFrameworkCore;

using DDDSample1.Domain.Trucks;

using DDDSample1.Infrastructure.Trucks;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {


        public DbSet<Truck> Trucks { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TruckEntityTypeConfiguration());
        }
    }
}