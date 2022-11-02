using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Deliveries{

    public class DeliveryDate : IValueObject
    {
        public DateTime deliveryDate{get; private set;}

        public DeliveryDate(){
            
        }
        public DeliveryDate(string deliveryDate){
                this.deliveryDate=createDate(deliveryDate);
        }
        public String AsString(){
            return deliveryDate.ToShortDateString();
        }

        private DateTime createDate(string Date){
          return new DateTime(int.Parse(Date.Substring(0,4)), int.Parse(Date.Substring(4,2)), int.Parse(Date.Substring(6,2)));
        }
    }
}