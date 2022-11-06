using System;
using Xunit;
using DDDSample1.Domain.Deliveries;
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
    public class TestDeliveryService
    {

        private readonly ITestOutputHelper output;

        public TestDeliveryService(ITestOutputHelper output)
        {
            this.output = output;
        }


        [Fact]
        public async Task AddAsync_ShouldReturnsDeliveryDTO()
        {
            // Arrange
            DeliveryDTO deliveryDTO1 = new DeliveryDTO { Id = "1", DeliveryDate = "20221011", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "1" };

            Delivery delivery = DeliveryMapper.toDelivery(deliveryDTO1);
            WarehouseDto warehouseDTO = new WarehouseDto { Id = "1", Designation = "waxrehouse", Street = "Rua do Warehouse", DoorNumber = 1, PostCode = "4575-222" , City = "City" ,Latitude = 1,Longitude = 1,Altitude = 1};
            Warehouse warehouse = WarehouseMapper.toWarehouse(warehouseDTO);
            var mockRepoDeliveries = new Mock<IDeliveryRepository>();
            var mockRepoWarehouses = new Mock<IWarehouseRepository>();

            mockRepoDeliveries.Setup(repo => repo.AddAsync(delivery));
            mockRepoWarehouses.Setup(repo => repo.GetByIdAsync(new WarehouseId("1"))).Returns(Task.FromResult(warehouse));

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new DeliveryService(mockUnity.Object, mockRepoDeliveries.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.AddAsync(deliveryDTO1);

            // Assert            
            var returnValue = Assert.IsType<DeliveryDTO>(result);
            
            Assert.Equal(deliveryDTO1.DeliveryWarehouseId, returnValue.DeliveryWarehouseId);
            Assert.Equal(deliveryDTO1.Id, returnValue.Id);
            Assert.Equal(deliveryDTO1.LoadTime, returnValue.LoadTime);
            Assert.Equal(deliveryDTO1.UnloadTime, returnValue.UnloadTime);
            Assert.Equal(deliveryDTO1.TotalWeight, returnValue.TotalWeight);
        }



         [Fact]
        public async Task GetAllAsync_ShouldReturnAllDeliveriesDTO()
        {
            // Arrange
            DeliveryDTO deliveryDTO1 = new DeliveryDTO { Id = "1", DeliveryDate = "11/10/2022", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "1" };
            DeliveryDTO deliveryDTO2 = new DeliveryDTO { Id = "2", DeliveryDate = "11/10/2022", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "2" };
            List<DeliveryDTO> resultList = new List<DeliveryDTO> { deliveryDTO1,deliveryDTO2 };
            
            Delivery delivery = new Delivery("1",new DeliveryDate("20221011"),new LoadTime(1),new UnloadTime(1),new TotalWeight(1),new WarehouseId("1"));
            Delivery delivery2 = new Delivery("2",new DeliveryDate("20221011"),new LoadTime(1),new UnloadTime(1),new TotalWeight(1),new WarehouseId("2"));
            List<Delivery> list = new List<Delivery> { delivery,delivery2 };


            var mockRepoDeliveries = new Mock<IDeliveryRepository>();
            var mockRepoWarehouses = new Mock<IWarehouseRepository>();
            mockRepoDeliveries.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(list)).Verifiable();;

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new DeliveryService(mockUnity.Object, mockRepoDeliveries.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.GetAllAsync();

            // Assert            
            var returnValue = Assert.IsType<List<DeliveryDTO>>(result);
            
            Assert.Equal(resultList[0].DeliveryDate,returnValue[0].DeliveryDate);
            Assert.Equal(resultList[0].DeliveryWarehouseId, returnValue[0].DeliveryWarehouseId);
            Assert.Equal(resultList[0].Id, returnValue[0].Id);
            Assert.Equal(resultList[0].LoadTime, returnValue[0].LoadTime);
            Assert.Equal(resultList[0].UnloadTime, returnValue[0].UnloadTime);
            Assert.Equal(resultList[0].TotalWeight, returnValue[0].TotalWeight);

            Assert.Equal(resultList[1].DeliveryDate,returnValue[1].DeliveryDate);
            Assert.Equal(resultList[1].DeliveryWarehouseId, returnValue[1].DeliveryWarehouseId);
            Assert.Equal(resultList[1].Id, returnValue[1].Id);
            Assert.Equal(resultList[1].LoadTime, returnValue[1].LoadTime);
            Assert.Equal(resultList[1].UnloadTime, returnValue[1].UnloadTime);
            Assert.Equal(resultList[1].TotalWeight, returnValue[1].TotalWeight);

        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturn1DeliveryDTO()
        {
            // Arrange
            DeliveryDTO deliveryDTO1 = new DeliveryDTO { Id = "1", DeliveryDate = "11/10/2022", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "1" };

            
            Delivery delivery = new Delivery("1",new DeliveryDate("20221011"),new LoadTime(1),new UnloadTime(1),new TotalWeight(1),new WarehouseId("1"));


            var mockRepoDeliveries = new Mock<IDeliveryRepository>();
            var mockRepoWarehouses = new Mock<IWarehouseRepository>();
            mockRepoDeliveries.Setup(repo => repo.GetByIdAsync(new DeliveryId("1"))).Returns(Task.FromResult(delivery)).Verifiable();;

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new DeliveryService(mockUnity.Object, mockRepoDeliveries.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.GetByIdAsync(new DeliveryId("1"));

            // Assert            
            var returnValue = Assert.IsType<DeliveryDTO>(result);
            
            Assert.Equal(deliveryDTO1.DeliveryDate, returnValue.DeliveryDate);
            Assert.Equal(deliveryDTO1.DeliveryWarehouseId, returnValue.DeliveryWarehouseId);
            Assert.Equal(deliveryDTO1.Id, returnValue.Id);
            Assert.Equal(deliveryDTO1.LoadTime, returnValue.LoadTime);
            Assert.Equal(deliveryDTO1.UnloadTime, returnValue.UnloadTime);
            Assert.Equal(deliveryDTO1.TotalWeight, returnValue.TotalWeight);

        }


        [Fact]
        public async Task UpdateAsync_ShouldReturn1DeliveryDTO()
        {
            // Arrange

            DeliveryDTO deliveryDTO = new DeliveryDTO { Id = "1", DeliveryDate = "20221011", LoadTime = 2, UnloadTime = 2, TotalWeight = 2 , DeliveryWarehouseId = "1" };

            
            Delivery delivery = new Delivery("1",new DeliveryDate("20221011"),new LoadTime(1),new UnloadTime(1),new TotalWeight(1),new WarehouseId("1"));


            var mockRepoDeliveries = new Mock<IDeliveryRepository>();
            var mockRepoWarehouses = new Mock<IWarehouseRepository>();
            mockRepoDeliveries.Setup(repo => repo.GetByIdAsync(new DeliveryId("1"))).Returns(Task.FromResult(delivery)).Verifiable();;

            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var service = new DeliveryService(mockUnity.Object, mockRepoDeliveries.Object, mockRepoWarehouses.Object);

            // Act
            var result = await service.UpdateAsync(deliveryDTO);

            // Assert            
            var returnValue = Assert.IsType<DeliveryDTO>(result);
            
            
            Assert.Equal(deliveryDTO.DeliveryWarehouseId, returnValue.DeliveryWarehouseId);
            Assert.Equal(deliveryDTO.Id, returnValue.Id);
            Assert.Equal(deliveryDTO.LoadTime, returnValue.LoadTime);
            Assert.Equal(deliveryDTO.UnloadTime, returnValue.UnloadTime);
            Assert.Equal(deliveryDTO.TotalWeight, returnValue.TotalWeight);

        }

        


    }
}
