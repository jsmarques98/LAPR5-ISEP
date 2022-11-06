using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public interface IDeliveryService
    {
        Task<List<DeliveryDTO>> GetAllAsync();

        Task<DeliveryDTO> GetByIdAsync(DeliveryId id);

        Task<DeliveryDTO> AddAsync(DeliveryDTO dto);

        Task<DeliveryDTO> UpdateAsync(DeliveryDTO dto);

        Task<DeliveryDTO> InactivateAsync(DeliveryId id);

        Task<DeliveryDTO> DeleteAsync(DeliveryId id);

    }
}