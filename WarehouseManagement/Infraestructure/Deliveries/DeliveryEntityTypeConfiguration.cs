using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Deliveries;

namespace DDDSample1.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            //builder.ToTable("Deliveries", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.DeliveryDate);
            builder.OwnsOne(b => b.LoadTime);
            builder.OwnsOne(b => b.UnloadTime);
            builder.OwnsOne(b => b.TotalWeight);
            builder.Property(b => b.DeliveryWarehouseId);
        }
    }
}