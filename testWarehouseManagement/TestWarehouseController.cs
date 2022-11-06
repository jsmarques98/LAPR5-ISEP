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
    public class TestWarehouseController
    {

        private readonly ITestOutputHelper output;

        public TestWarehouseController(ITestOutputHelper output)
        {
            this.output = output;
        }
        
        [Fact]
        public async Task GetAllAsync_ShouldReturnAllWarehousesDTOAsync()
        {
           // Arrange

            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.11, Longitude = 1.11, Altitude = 1.11};
            WarehouseDto warehouseDto2 = new WarehouseDto {Id = "2", Designation = "warehouse2", Street = "warehouseStreet2", DoorNumber = 2, PostCode = "2", City = "Porto2",Latitude = 2.0, Longitude = 2.0, Altitude = 2.0};
            List<WarehouseDto> listDTO = new List<WarehouseDto> { warehouseDto1,warehouseDto2 };

            var mockService = new Mock<IWarehouseService>();
            mockService.Setup(t => t.GetAllAsync()).ReturnsAsync(listDTO).Verifiable();
            
            var controller = new WarehousesController(mockService.Object);

           // Act
        
            var result = controller.GetAll();

        
            // Assert

            var returnValue = Assert.IsType<List<WarehouseDto>>(result.Result.Value);
            mockService.Verify();

            Assert.Equal(listDTO, returnValue);
        }

        [Fact]
        public async Task GetGetById_ShouldReturn1WarehouseDtoAsync()
        {
           // Arrange
            var id = "1";
            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.0, Longitude = 1.0, Altitude = 1.0};

            var mockService = new Mock<IWarehouseService>();
            mockService.Setup(t => t.GetByIdAsync(new WarehouseId(id))).ReturnsAsync(warehouseDto1).Verifiable();
            
            var controller = new WarehousesController(mockService.Object);

           // Act
        
            var result = controller.GetGetById(id);

        
            // Assert

            var returnValue = Assert.IsType<WarehouseDto>(result.Result.Value);
            mockService.Verify();

            Assert.Equal(warehouseDto1, returnValue);
        }

        [Fact]
        public async Task Create_ShouldReturnSuccess()
        {
           // Arrange
            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.0, Longitude = 1.0, Altitude = 1.0};

            var mockService = new Mock<IWarehouseService>();
            mockService.Setup(x => x.AddAsync(It.IsAny<WarehouseDto>())).Returns(Task.FromResult(warehouseDto1));

            var controller = new WarehousesController(mockService.Object);

           // Act
        
            var result = controller.Create(warehouseDto1).Result;
        
            // Assert
            Assert.IsType<ActionResult<WarehouseDto>>(result);

        }


         [Fact]
        public async Task Update_ShouldReturnSuccess()
        {

            //arrange
            var id = "1";
            WarehouseDto warehouseDto1 = new WarehouseDto {Id = "1", Designation = "warehouse1", Street = "warehouseStreet1", DoorNumber = 1, PostCode = "1", City = "Porto1",Latitude = 1.0, Longitude = 1.0, Altitude = 1.0};

            var mockService = new Mock<IWarehouseService>();
            mockService.Setup(x => x.UpdateAsync(It.IsAny<WarehouseDto>())).Returns(Task.FromResult(warehouseDto1));

            var controller = new WarehousesController(mockService.Object);

           // Act
        
            var result = controller.Update(id,warehouseDto1).Result;
        
            // Assert
            Assert.IsType<ActionResult<WarehouseDto>>(result);
        }


    }
}
