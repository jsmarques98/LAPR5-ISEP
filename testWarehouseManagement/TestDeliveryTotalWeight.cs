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
    public class TestDeliveryTotalWeight
    {

        [Fact]
        public void CreateTotalWeightSuccess()
        {
            const int totalWeight = 5;
            var result = new TotalWeight(totalWeight);
            Assert.Equal(totalWeight,result.Value());
        }

        [Fact]
        public void CreateTotalWeightFailsForNegative()
        {
            Assert.Throws<Exception>(() => new TotalWeight(-1));
        }
    }
}