using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Warehouses{
    public class Coordinates : IValueObject
    {
        public double Latitude { get;  private set; }
        public double Longitude { get;  private set; }
        public double Altitude { get;  private set; }

        public Coordinates (double latitude, double longitude, double altitude){
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Altitude = altitude;

        
    }   
}
}