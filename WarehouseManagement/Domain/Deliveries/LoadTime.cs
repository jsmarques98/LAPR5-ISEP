using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Deliveries{
    public class LoadTime : IValueObject
    {
        public int Time{get; private set;}

        public LoadTime(int time){
            if(Validate(time))
                this.Time=time;
        }
        public int Value(){
            return Time;
        }

        private Boolean Validate(int Time){
            if(Time>0)
                return true;

            throw new Exception("Load Time cannot be negative");
        }
    }    
}