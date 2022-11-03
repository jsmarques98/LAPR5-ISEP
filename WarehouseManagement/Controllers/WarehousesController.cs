using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehousesController : ControllerBase
    {
        private readonly WarehouseService _service;

        public WarehousesController(WarehouseService service)
        {
            _service = service;
        }

        // GET: api/Warehouses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Warehouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDto>> GetGetById(String id)
        {
            var war = await _service.GetByIdAsync(new WarehouseId(id));

            if (war == null)
            {
                return NotFound();
            }

            return war;
        }

        // POST: api/Warehouses
        [HttpPost]
        public async Task<ActionResult<WarehouseDto>> Create(WarehouseDto dto)
        {
            var war = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = war.Id }, war);
        }

        
        // PUT: api/Warehouses/5
        [HttpPut("{id}")]
        public async Task<ActionResult<WarehouseDto>> Update(String id, WarehouseDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var war = await _service.UpdateAsync(dto);
                
                if (war == null)
                {
                    return NotFound();
                }
                return Ok(war);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Warehouses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WarehouseDto>> SoftDelete(String id)
        {
            var war = await _service.InactivateAsync(new WarehouseId(id));

            if (war == null)
            {
                return NotFound();
            }

            return Ok(war);
        }
        
        // DELETE: api/Warehouses/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<WarehouseDto>> HardDelete(String id)
        {
            try
            {
                var war = await _service.DeleteAsync(new WarehouseId(id));

                if (war == null)
                {
                    return NotFound();
                }

                return Ok(war);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}