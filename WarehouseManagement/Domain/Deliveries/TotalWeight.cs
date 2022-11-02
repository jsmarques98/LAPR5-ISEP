using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Deliveries{
    public class TotalWeight : IValueObject
    {
        public double Weight{get; private set;}

        public TotalWeight (double weight){
            if(Validate(weight))
                this.Weight = weight;
        }

        public double Value(){
            return Weight;
        }

        private Boolean Validate(double Weight){
            if(Weight>0)
                return true;

            throw new Exception("Weight cannot be negative");
        }
    }    
}