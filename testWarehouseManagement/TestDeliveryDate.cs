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
    public class TestDeliveryDate
    {

        [Fact]
        public void CreateDeliveryDateSuccess()
        {
            const string deliveryDate = "20221011";
            var result = new DeliveryDate(deliveryDate);
            var excpected = "11/10/2022";
            Assert.Equal(excpected,result.AsString());
        }

        [Fact]
        public void CreateDeliveryDateFailsForUnformatedDate()
        {
            Assert.Throws<System.ArgumentOutOfRangeException>(() => new DeliveryDate("19823"));
        }
    }
}