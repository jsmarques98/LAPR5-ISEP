using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {
     
        public Designation Designation { get;  private set; }
        public Address Address { get;  private set; }
        public Coordinates Coordinates { get;  private set; }
        public bool Active{ get;  private set; }

        private Warehouse()
        {
            this.Active = true;
        }

        public Warehouse(String warehouseId, Designation designation, Address address, Coordinates coordinates, bool Active)
        {
            this.Id = new WarehouseId(warehouseId);
            this.Designation = designation;
            this.Address = address;
            this.Coordinates = coordinates;
            this.Active = true;
        }

        public void ChangeDesignation(Designation designation)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive warehouse.");
            this.Designation = designation;
        }

        public void ChangeAddress(Address address)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive warehouse.");
            this.Address = address;
        }

        public void ChangeCoordinates(Coordinates coordinates)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive warehouse.");
            this.Coordinates = coordinates;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}