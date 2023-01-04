using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Warehouses{
    public class Address : IValueObject
    {
        public string Street {get; private set;}
        public int DoorNumber {get; private set;}
        public string PostCode {get; private set;}
        public string City {get; private set;}

        public Address (string street, int doorNumber, string postCode, string city){
            if(Validate(street))
                this.Street = street;
            if(ValidateDoorNumber(doorNumber))
                this.DoorNumber = doorNumber;
            if(Validate(postCode))    
                this.PostCode = postCode;
            if(Validate(city))    
                this.City = city;
        }

        private Boolean Validate(string Address){
            if(Address != null)
                return true;

            throw new Exception("It cannot be null");
        }
        
        private Boolean ValidateDoorNumber(int DoorNumber){
            if(DoorNumber >= 0 && DoorNumber != null)
                return true;

            throw new Exception("Door number cannot be negative");
        }
    }    
}