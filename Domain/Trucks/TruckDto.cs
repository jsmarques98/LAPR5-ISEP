using System;


namespace DDDSample1.Domain.Trucks
{
    public class TruckDto
    {
        public Guid Id { get; set; }
        public string Brand { get;  set; }
        public string Model { get;  set; }
        

        public TruckDto(Guid Id, string brand, string Model)
        {
            this.Id = Id;
            this.Brand = brand;
            this.Model = Model;
        }
    }
}