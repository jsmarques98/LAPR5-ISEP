using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Warehouses{
    public class Coordinates : IValueObject
    {
        public float Latitude { get;  private set; }
        public float Longitude { get;  private set; }
        public float Altitude { get;  private set; }

        public Coordinates (float latitude, float longitude, float altitude){
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Altitude = altitude;
        }

         public float Latitude(){
            return Latitude;
        } 

        public float Longitude(){
            return Latitude;
        } 

        public float Altitude(){
            return Latitude;
        } 

        
    }    
}