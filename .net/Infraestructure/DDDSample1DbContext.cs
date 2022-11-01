using Microsoft.EntityFrameworkCore;

using DDDSample1.Domain.Trucks;
using DDDSample1.Domain.Warehouses;

using DDDSample1.Infrastructure.Trucks;
using DDDSample1.Infrastructure.Warehouses;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {


        public DbSet<Truck> Trucks { get; set; }

        public DbSet<Warehouse> Warehouses { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TruckEntityTypeConfiguration());

             modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
        }
    }
}