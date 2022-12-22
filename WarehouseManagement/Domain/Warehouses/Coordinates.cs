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
            if(ValidateLatitude(latitude))
                this.Latitude = latitude;
            if(ValidateLongitude(longitude))    
                this.Longitude = longitude;
            if(ValidateAltitude(altitude))    
                this.Altitude = altitude;
        }
        
        private Boolean ValidateLatitude(double latitude){
            if(latitude>=0 && latitude <=90)
                return true;

            throw new Exception("Latitude cannot be negative or bigger than 90 degrees");
        }
        private Boolean ValidateLongitude(double longitude){
            if(longitude>=0 && longitude <=180)
                return true;

            throw new Exception("Longitude cannot be negative or bigger than 180 degrees");
        }

        private Boolean ValidateAltitude(double altitude){
            if(altitude>=0)
                return true;

            throw new Exception("Altitude cannot be negative");
        }
        
    }   
}
