using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Trucks;

namespace DDDSample1.Infrastructure.Trucks
{
    internal class TruckEntityTypeConfiguration : IEntityTypeConfiguration<Truck>
    {
        public void Configure(EntityTypeBuilder<Truck> builder)
        {
            //builder.ToTable("Trucks", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
        }
    }
}