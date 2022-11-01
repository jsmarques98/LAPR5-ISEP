using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {
     
        public string Description { get;  private set; }

        public bool Active{ get;  private set; }

        private Warehouse()
        {
            this.Active = true;
        }

        public Warehouse(string description)
        {
            this.Id = new WarehouseId(Guid.NewGuid());
            this.Description = description;
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive warehouse.");
            this.Description = description;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}