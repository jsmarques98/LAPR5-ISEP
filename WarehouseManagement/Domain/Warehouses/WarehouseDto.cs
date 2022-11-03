using System;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDto
    {
        public String Id { get; set; }
        public string Designation { get; set; }
        public string Street {get; private set;}
        public int DoorNumber {get; private set;}
        public string PostCode {get; private set;}
        public string City {get; private set;}
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Altitude { get; set; }
    }
}