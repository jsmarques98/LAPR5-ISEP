
namespace DDDSample1.Domain.Trucks
{
    public class CreatingTruckDto
    {
        public string Brand { get;  set; }
        public string Model { get;  set; }
        


        public CreatingTruckDto(string brand, string model)
        {
            this.Brand = brand;
            this.Model = model;
        }
    }
}