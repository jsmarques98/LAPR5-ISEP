using System;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Warehouses{
    public class WarehouseMapper {
        public static WarehouseDto toDTO(Warehouse warehouse){
            return new WarehouseDto{Id = warehouse.Id.AsString(), Designation = warehouse.Designation.Value(),
                Street = warehouse.Address.Street, DoorNumber = warehouse.Address.DoorNumber,
                PostCode = warehouse.Address.PostCode, City = warehouse.Address.City,
                Latitude = warehouse.Coordinates.Latitude, Longitude = warehouse.Coordinates.Longitude,
                Altitude = warehouse.Coordinates.Altitude, Active = warehouse.Active};
            
        }

        public static Warehouse toWarehouse(WarehouseDto warehouseDTO){
            return new Warehouse(warehouseDTO.Id,
            new Designation(warehouseDTO.Designation),
            new Address(warehouseDTO.Street, warehouseDTO.DoorNumber, warehouseDTO.PostCode, warehouseDTO.City),
            new Coordinates(warehouseDTO.Latitude, warehouseDTO.Longitude, warehouseDTO.Altitude),
            warehouseDTO.Active);
        }
        
    }
}