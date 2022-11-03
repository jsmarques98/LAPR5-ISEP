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
            this.Street = street;
            if(Validate(doorNumber))
                this.DoorNumber = doorNumber;
            this.PostCode = postCode;
            this.City = city;
        }

        


        private Boolean Validate(int DoorNumber){
            if(DoorNumber >= 0)
                return true;

            throw new Exception("Door number cannot be negative");
        }
    }    
}