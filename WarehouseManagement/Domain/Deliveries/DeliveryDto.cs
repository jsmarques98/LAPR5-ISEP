using System;


namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDTO
    {
        public String Id { get; set; }
        public string DeliveryDate { get;  set; }
        public int LoadTime { get;  set; }
        public int UnloadTime { get;  set; }
        public double TotalWeight { get;  set; }
        
    }
}