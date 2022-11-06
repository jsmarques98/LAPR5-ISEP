using System;
using Xunit;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Controllers;
using Moq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Xunit.Abstractions;

namespace testWarehouseManagement
{
    public class TestDeliveriesController
    {

        private readonly ITestOutputHelper output;

        public TestDeliveriesController(ITestOutputHelper output)
        {
            this.output = output;
        }
        [Fact]
        public async Task GetAllAsync_ShouldReturnAllDeliveriesDTOAsync()
        {
           // Arrange

            DeliveryDTO deliveryDTO1 = new DeliveryDTO { Id = "1", DeliveryDate = "20221110", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "1" };
            DeliveryDTO deliveryDTO2 = new DeliveryDTO { Id = "2", DeliveryDate = "20221222", LoadTime = 2, UnloadTime = 2, TotalWeight = 2 , DeliveryWarehouseId = "2" };
            List<DeliveryDTO> listDTO = new List<DeliveryDTO> { deliveryDTO1,deliveryDTO2 };

            var mockService = new Mock<IDeliveryService>();
            mockService.Setup(t => t.GetAllAsync()).ReturnsAsync(listDTO).Verifiable();
            
            var controller = new DeliveriesController(mockService.Object);

           // Act
        
            var result = controller.GetAll();

        
            // Assert

            var returnValue = Assert.IsType<List<DeliveryDTO>>(result.Result.Value);
            mockService.Verify();

            Assert.Equal(listDTO, returnValue);
        }

        [Fact]
        public async Task GetGetById_ShouldReturn1DeliveryDTOAsync()
        {
           // Arrange
            var id = "1";
            DeliveryDTO deliveryDTO1 = new DeliveryDTO { Id = "1", DeliveryDate = "20221110", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "1" };

            var mockService = new Mock<IDeliveryService>();
            mockService.Setup(t => t.GetByIdAsync(new DeliveryId(id))).ReturnsAsync(deliveryDTO1).Verifiable();
            
            var controller = new DeliveriesController(mockService.Object);

           // Act
        
            var result = controller.GetGetById(id);

        
            // Assert

            var returnValue = Assert.IsType<DeliveryDTO>(result.Result.Value);
            mockService.Verify();

            Assert.Equal(deliveryDTO1, returnValue);
        }

        [Fact]
        public async Task Create_ShouldReturnSuccess()
        {
           // Arrange
            DeliveryDTO deliveryDTO1 = new DeliveryDTO { Id = "1", DeliveryDate = "20221110", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "1" };

            var mockService = new Mock<IDeliveryService>();
            mockService.Setup(x => x.AddAsync(It.IsAny<DeliveryDTO>())).Returns(Task.FromResult(deliveryDTO1));

            var controller = new DeliveriesController(mockService.Object);

           // Act
        
            var result = controller.Create(deliveryDTO1).Result;
        
            // Assert
            Assert.IsType<ActionResult<DeliveryDTO>>(result);

        }


         [Fact]
        public async Task Update_ShouldReturnSuccess()
        {

            //arrange
            var id = "1";
            DeliveryDTO deliveryDTO1 = new DeliveryDTO { Id = "1", DeliveryDate = "20221110", LoadTime = 1, UnloadTime = 1, TotalWeight = 1 , DeliveryWarehouseId = "1" };

            var mockService = new Mock<IDeliveryService>();
            mockService.Setup(x => x.UpdateAsync(It.IsAny<DeliveryDTO>())).Returns(Task.FromResult(deliveryDTO1));

            var controller = new DeliveriesController(mockService.Object);

           // Act
        
            var result = controller.Update(id,deliveryDTO1).Result;
        
            // Assert
            Assert.IsType<ActionResult<DeliveryDTO>>(result);
        }



    }
}
