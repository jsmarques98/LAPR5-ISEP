using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Deliveries;


namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly DeliveryService _service;

        public DeliveriesController(DeliveryService service)
        {
            _service = service;
        }

        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDTO>> GetGetById(String id)
        {
            var delivery = await _service.GetByIdAsync(new DeliveryId(id));

            if (delivery == null)
            {
                return NotFound();
            }

            return delivery;
        }

        // POST: api/Deliveries
        [HttpPost]
        public async Task<ActionResult<DeliveryDTO>> Create(DeliveryDTO dto)
        {
            try
            {
                var delivery = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = delivery.Id }, delivery);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        
        // PUT: api/Deliveries/5
        [HttpPut("{id}")]
        public async Task<ActionResult<DeliveryDTO>> Update(String id, DeliveryDTO dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var delivery = await _service.UpdateAsync(dto);
                
                if (delivery == null)
                {
                    return NotFound();
                }
                return Ok(delivery);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDTO>> SoftDelete(String id)
        {
            var delivery = await _service.InactivateAsync(new DeliveryId(id));

            if (delivery == null)
            {
                return NotFound();
            }

            return Ok(delivery);
        }
        
        // DELETE: api/Deliveries/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<DeliveryDTO>> HardDelete(String id)
        {
            try
            {
                var delivery = await _service.DeleteAsync(new DeliveryId(id));

                if (delivery == null)
                {
                    return NotFound();
                }

                return Ok(delivery);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}