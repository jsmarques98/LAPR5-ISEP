using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Trucks;


namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrucksController : ControllerBase
    {
        private readonly TruckService _service;

        public TrucksController(TruckService service)
        {
            _service = service;
        }

        // GET: api/Trucks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TruckDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Trucks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TruckDto>> GetGetById(Guid id)
        {
            var truck = await _service.GetByIdAsync(new TruckId(id));

            if (truck == null)
            {
                return NotFound();
            }

            return truck;
        }

        // POST: api/Trucks
        [HttpPost]
        public async Task<ActionResult<TruckDto>> Create(CreatingTruckDto dto)
        {
            try
            {
                var truck = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = truck.Id }, truck);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        
        // PUT: api/Trucks/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TruckDto>> Update(Guid id, TruckDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var truck = await _service.UpdateAsync(dto);
                
                if (truck == null)
                {
                    return NotFound();
                }
                return Ok(truck);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Trucks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TruckDto>> SoftDelete(Guid id)
        {
            var truck = await _service.InactivateAsync(new TruckId(id));

            if (truck == null)
            {
                return NotFound();
            }

            return Ok(truck);
        }
        
        // DELETE: api/Trucks/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<TruckDto>> HardDelete(Guid id)
        {
            try
            {
                var truck = await _service.DeleteAsync(new TruckId(id));

                if (truck == null)
                {
                    return NotFound();
                }

                return Ok(truck);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}