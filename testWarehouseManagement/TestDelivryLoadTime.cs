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
    public class TestDelivryLoadTime
    {

        [Fact]
        public void CreateLoadTimeSuccess()
        {
            const int loadTime = 5;
            var result = new LoadTime(loadTime);
            Assert.Equal(loadTime,result.Value());
        }

        [Fact]
        public void CreateLoadTimeFailsForNegative()
        {
            Assert.Throws<Exception>(() => new LoadTime(-1));
        }
    }
}