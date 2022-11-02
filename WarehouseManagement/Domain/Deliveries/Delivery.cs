using System;
using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Deliveries
{

    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {
    
        public DeliveryDate DeliveryDate{ get;  private set; }
        public LoadTime LoadTime { get;  private set; }
        public UnloadTime UnloadTime{ get;  private set; }
        public TotalWeight TotalWeight {get; private set;}
        public bool Active{ get;  private set; }


        private Delivery()
        {
            this.Active = true;
        }

        public Delivery(String deliveryId,DeliveryDate deliveryDate, LoadTime loadTime,UnloadTime unloadTime,TotalWeight totalWeight )
        {
            this.Id = new DeliveryId(deliveryId);
            this.DeliveryDate = deliveryDate;
            this.LoadTime = loadTime;
            this.UnloadTime = unloadTime;
            this.TotalWeight = totalWeight;
            this.Active = true;
        }

     public void ChangeDeliveryDate(DeliveryDate deliveryDate)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the delivery date to an inactive delivery.");
            this.DeliveryDate = deliveryDate;
        }

        public void ChangeLoadTime(LoadTime loadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the load time to an inactive delivery.");
            this.LoadTime = loadTime;
        }

        public void ChangeUnloadTime(UnloadTime unloadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the load time to an inactive delivery.");
            this.UnloadTime = unloadTime;
        }

            public void ChangeTotalWeight(TotalWeight totalWeight)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the total weight to an inactive delivery.");
            this.TotalWeight = totalWeight;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}
