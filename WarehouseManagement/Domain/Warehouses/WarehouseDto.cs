using System;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDto
    {
        public String Id { get; set; }
        public string Designation { get; set; }
        public string Street {get; set;}
        public int DoorNumber {get; set;}
        public string PostCode {get; set;}
        public string City {get; set;}
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
        public bool Active {get; set; }
    }
}