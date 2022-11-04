using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;


namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;
        private readonly IWarehouseRepository _repoWarehouses;

        

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo, IWarehouseRepository repoWarehouses)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoWarehouses = repoWarehouses;
        }

        public async Task<List<DeliveryDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<DeliveryDTO> listDto = list.ConvertAll<DeliveryDTO>(delivery => DeliveryMapper.toDTO(delivery));

            return listDto;
        }

        public async Task<DeliveryDTO> GetByIdAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id);
            
            if(delivery == null)
                return null;

            return  DeliveryMapper.toDTO(delivery);

        }

        public async Task<DeliveryDTO> AddAsync(DeliveryDTO dto)
        {
            var deliveryWarehouseId = new WarehouseId(dto.DeliveryWarehouseId);
            await checkDeliveryWarehouseIdAsync(deliveryWarehouseId);
            var delivery = DeliveryMapper.toDelivery(dto);

            await this._repo.AddAsync(delivery);

            await this._unitOfWork.CommitAsync();

            return DeliveryMapper.toDTO(delivery);
        }

        public async Task<DeliveryDTO> UpdateAsync(DeliveryDTO dto)
        {
            
            var delivery = await this._repo.GetByIdAsync(new DeliveryId(dto.Id)); 

            if (delivery == null)
                return null;   

            // change all fields
            delivery.ChangeDeliveryDate(new DeliveryDate(dto.DeliveryDate));
            delivery.ChangeLoadTime(new LoadTime(dto.LoadTime));
            delivery.ChangeUnloadTime(new UnloadTime(dto.UnloadTime));
            delivery.ChangeTotalWeight(new TotalWeight(dto.TotalWeight));
            delivery.ChangeDeliveryWarehouseId(new WarehouseId(dto.DeliveryWarehouseId));     
            
            await this._unitOfWork.CommitAsync();

            return  DeliveryMapper.toDTO(delivery);
        }


        public async Task<DeliveryDTO> InactivateAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id); 

            if (delivery == null)
                return null;   

            delivery.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return DeliveryMapper.toDTO(delivery);

        }

        public async Task<DeliveryDTO> DeleteAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id); 

            if (delivery == null)
                return null;   

            if (delivery.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active delivery.");
            
            this._repo.Remove(delivery);
            await this._unitOfWork.CommitAsync();

            return DeliveryMapper.toDTO(delivery);
        }


        private async Task checkDeliveryWarehouseIdAsync(WarehouseId deliveryWarehouseId)
        {
           var deliveryWarehouse = await _repoWarehouses.GetByIdAsync(deliveryWarehouseId);
           if (deliveryWarehouse == null)
                throw new BusinessRuleValidationException("Invalid Delivery WarehouseId Id.");
        }
    }
}