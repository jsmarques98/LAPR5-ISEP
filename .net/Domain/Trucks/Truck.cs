using System;
using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Trucks
{

    public class Truck : Entity<TruckId>, IAggregateRoot
    {

        public string Brand { get;  private set; }
        public string Model { get;  private set; }

        public bool Active{ get;  private set; }


        private Truck()
        {
            this.Active = true;
        }

        public Truck(string brand, string model)
        {
            this.Id = new TruckId(Guid.NewGuid());
            this.Brand = brand;
            this.Model = model;
            this.Active = true;
        }

     public void ChangeModel(string model)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the model to an inactive truck.");
            this.Model = model;
        }

        public void ChangeBrand(string brand)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the brand to an inactive truck.");
            this.Brand = brand;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}
