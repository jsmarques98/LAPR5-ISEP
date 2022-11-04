using System;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries{
    public class DeliveryMapper {
        public static DeliveryDTO toDTO(Delivery delivery){
            return new DeliveryDTO{Id =delivery.Id.AsString(),
            DeliveryDate = delivery.DeliveryDate.AsString(),
            LoadTime = delivery.LoadTime.Value(),
            UnloadTime = delivery.UnloadTime.Value(),
            TotalWeight= delivery.TotalWeight.Value(),
            DeliveryWarehouseId = delivery.DeliveryWarehouseId.AsString()};
        }

        public static Delivery toDelivery(DeliveryDTO deliveryDTO){
            return new Delivery(deliveryDTO.Id,
            new DeliveryDate(deliveryDTO.DeliveryDate),
            new LoadTime(deliveryDTO.LoadTime),
            new UnloadTime(deliveryDTO.UnloadTime),
            new TotalWeight(deliveryDTO.TotalWeight),
            new WarehouseId(deliveryDTO.DeliveryWarehouseId));
        }
        
    }
}