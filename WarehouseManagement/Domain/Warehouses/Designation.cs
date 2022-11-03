using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Warehouses{
    public class Designation : IValueObject
    {
        public string Description{get; private set;}

        public Designation (string description){
            if(Validate(description))
                this.Description = description;
        }

        public string Value(){
            return Description;
        }

        private Boolean Validate(string Description){
            if(Description != null)
                return true;

            throw new Exception("Description cannot be null");
        }
    }    
}