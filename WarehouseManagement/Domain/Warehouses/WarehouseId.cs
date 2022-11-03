using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseId : EntityId
    {
         public WarehouseId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            if(Validate(long.Parse(text)))
                return text;
            return new Exception("Error");
        }
        
        override
        public String AsString(){
            return (String) base.ObjValue;
        }

        private Boolean Validate(long Id){
            if(Id>0)
                return true;

            throw new Exception("ID cannot be negative");
        }
    }
}