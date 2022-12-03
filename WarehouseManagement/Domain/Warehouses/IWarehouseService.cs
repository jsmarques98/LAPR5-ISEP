using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Warehouses
{
    public interface IWarehouseService
    {
        Task<List<WarehouseDto>> GetAllAsync();

        Task<WarehouseDto> GetByIdAsync(WarehouseId id);

        Task<WarehouseDto> AddAsync(WarehouseDto dto);

        Task<WarehouseDto> UpdateAsync(WarehouseDto dto);

        Task<WarehouseDto> InactivateAsync(WarehouseId id);
        
        Task<WarehouseDto> DeleteAsync(WarehouseId id);



    }
}