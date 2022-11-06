using System;
using Xunit;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Controllers;
using Moq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Xunit.Abstractions;

namespace testWarehouseManagement
{
    public class TestWarehouseService
    {

        private readonly ITestOutputHelper output;

        public TestWarehouseService(ITestOutputHelper output)
        {
            this.output = output;
        }


        [Fact]
        public async Task AddAsync_ShouldReturnsWarehouseDto()
        {
            // Arrange
            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.0, Longitude = 1.0, Altitude = 1.0};

            Warehouse warehouse = WarehouseMapper.toWarehouse(warehouseDto1);
            var mockRepoWarehouses = new Mock<IWarehouseRepository>();

            mockRepoWarehouses.Setup(repo => repo.AddAsync(warehouse));

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new WarehouseService(mockUnity.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.AddAsync(warehouseDto1);

            // Assert            
            var returnValue = Assert.IsType<WarehouseDto>(result);
            
            Assert.Equal(warehouseDto1.Id, returnValue.Id);
            Assert.Equal(warehouseDto1.Designation, returnValue.Designation);
            Assert.Equal(warehouseDto1.Street, returnValue.Street);
            Assert.Equal(warehouseDto1.DoorNumber, returnValue.DoorNumber);
            Assert.Equal(warehouseDto1.PostCode, returnValue.PostCode);
            Assert.Equal(warehouseDto1.City, returnValue.City);
            Assert.Equal(warehouseDto1.Latitude, returnValue.Latitude);
            Assert.Equal(warehouseDto1.Longitude, returnValue.Longitude);
            Assert.Equal(warehouseDto1.Altitude, returnValue.Altitude);
        }



         [Fact]
        public async Task GetAllAsync_ShouldReturnAllWarehousesDto()
        {
            // Arrange
            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.0, Longitude = 1.0, Altitude = 1.0};
            WarehouseDto warehouseDto2 = new WarehouseDto {Id = "2", Designation = "warehouse2", Street = "warehouseStreet2", DoorNumber = 2, PostCode = "2", City = "Porto2",Latitude = 2.0, Longitude = 2.0, Altitude = 2.0};
            List<WarehouseDto> resultList = new List<WarehouseDto> { warehouseDto1,warehouseDto2 };
            
            Warehouse warehouse = new Warehouse("1",new Designation("warehouse1"),new Address("warehouseStreet1", 1, "1", "Porto1"),new Coordinates(1.0, 1.0, 1.0));
            Warehouse warehouse2 = new Warehouse("2",new Designation("warehouse2"),new Address("warehouseStreet2", 2, "2", "Porto2"),new Coordinates(2.0, 2.0, 2.0));
            List<Warehouse> list = new List<Warehouse> { warehouse,warehouse2 };

            var mockRepoWarehouses = new Mock<IWarehouseRepository>();
            mockRepoWarehouses.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(list)).Verifiable();;

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new WarehouseService(mockUnity.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.GetAllAsync();

            // Assert            
            var returnValue = Assert.IsType<List<WarehouseDto>>(result);
            
            Assert.Equal(resultList[0].Id, returnValue[0].Id);
            Assert.Equal(resultList[0].Designation, returnValue[0].Designation);
            Assert.Equal(resultList[0].Street, returnValue[0].Street);
            Assert.Equal(resultList[0].DoorNumber, returnValue[0].DoorNumber);
            Assert.Equal(resultList[0].PostCode, returnValue[0].PostCode);
            Assert.Equal(resultList[0].City, returnValue[0].City);
            Assert.Equal(resultList[0].Latitude, returnValue[0].Latitude);
            Assert.Equal(resultList[0].Longitude, returnValue[0].Longitude);
            Assert.Equal(resultList[0].Altitude, returnValue[0].Altitude);

            Assert.Equal(resultList[1].Id, returnValue[1].Id);
            Assert.Equal(resultList[1].Designation, returnValue[1].Designation);
            Assert.Equal(resultList[1].Street, returnValue[1].Street);
            Assert.Equal(resultList[1].DoorNumber, returnValue[1].DoorNumber);
            Assert.Equal(resultList[1].PostCode, returnValue[1].PostCode);
            Assert.Equal(resultList[1].City, returnValue[1].City);
            Assert.Equal(resultList[1].Latitude, returnValue[1].Latitude);
            Assert.Equal(resultList[1].Longitude, returnValue[1].Longitude);
            Assert.Equal(resultList[1].Altitude, returnValue[1].Altitude);

        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturn1WarehouseDto()
        {
            // Arrange
            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.0, Longitude = 1.0, Altitude = 1.0};

            
            Warehouse warehouse = new Warehouse("1",new Designation("warehouse1"),new Address("warehouseStreet1", 1, "1", "Porto1"),new Coordinates(1.0, 1.0, 1.0));


            var mockRepoWarehouses = new Mock<IWarehouseRepository>();
            mockRepoWarehouses.Setup(repo => repo.GetByIdAsync(new WarehouseId("1"))).Returns(Task.FromResult(warehouse)).Verifiable();;

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new WarehouseService(mockUnity.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.GetByIdAsync(new WarehouseId("1"));

            // Assert            
            var returnValue = Assert.IsType<WarehouseDto>(result);
            
            Assert.Equal(warehouseDto1.Id, returnValue.Id);
            Assert.Equal(warehouseDto1.Designation, returnValue.Designation);
            Assert.Equal(warehouseDto1.Street, returnValue.Street);
            Assert.Equal(warehouseDto1.DoorNumber, returnValue.DoorNumber);
            Assert.Equal(warehouseDto1.PostCode, returnValue.PostCode);
            Assert.Equal(warehouseDto1.City, returnValue.City);
            Assert.Equal(warehouseDto1.Latitude, returnValue.Latitude);
            Assert.Equal(warehouseDto1.Longitude, returnValue.Longitude);
            Assert.Equal(warehouseDto1.Altitude, returnValue.Altitude);


        }


        [Fact]
        public async Task UpdateAsync_ShouldReturn1WarehouseDto()
        {
            // Arrange

            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.0, Longitude = 1.0, Altitude = 1.0};

            Warehouse warehouse = new Warehouse("1",new Designation("warehouse1"),new Address("warehouseStreet1", 1, "1", "Porto1"),new Coordinates(1.0, 1.0, 1.0));


            var mockRepoWarehouses = new Mock<IWarehouseRepository>();
            mockRepoWarehouses.Setup(repo => repo.GetByIdAsync(new WarehouseId("1"))).Returns(Task.FromResult(warehouse)).Verifiable();;

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new WarehouseService(mockUnity.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.UpdateAsync(warehouseDto1);

            // Assert            
            var returnValue = Assert.IsType<WarehouseDto>(result);
            
            
            Assert.Equal(warehouseDto1.Id, returnValue.Id);
            Assert.Equal(warehouseDto1.Designation, returnValue.Designation);
            Assert.Equal(warehouseDto1.Street, returnValue.Street);
            Assert.Equal(warehouseDto1.DoorNumber, returnValue.DoorNumber);
            Assert.Equal(warehouseDto1.PostCode, returnValue.PostCode);
            Assert.Equal(warehouseDto1.City, returnValue.City);
            Assert.Equal(warehouseDto1.Latitude, returnValue.Latitude);
            Assert.Equal(warehouseDto1.Longitude, returnValue.Longitude);
            Assert.Equal(warehouseDto1.Altitude, returnValue.Altitude);

        }

    }
}
 