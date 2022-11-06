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
    public class TestDelivryUnloadTime
    {

        [Fact]
        public void CreateUnloadTimeSuccess()
        {
            const int unloadTime = 5;
            var result = new UnloadTime(unloadTime);
            Assert.Equal(unloadTime,result.Value());
        }

        [Fact]
        public void CreateUnloadTimeFailsForNegative()
        {
            Assert.Throws<Exception>(() => new UnloadTime(-1));
        }
    }
}