using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseService : IWarehouseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWarehouseRepository _repo;

        public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<WarehouseDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(warehouse => WarehouseMapper.toDTO(warehouse));

            return listDto;
        }

        public async Task<WarehouseDto> GetByIdAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);
            
            if(warehouse == null)
                return null;

            return WarehouseMapper.toDTO(warehouse);
        }

        public async Task<WarehouseDto> AddAsync(WarehouseDto dto)
        {
            var warehouse = WarehouseMapper.toWarehouse(dto);

            await this._repo.AddAsync(warehouse);

            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.toDTO(warehouse);
        }

        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var warehouse = await this._repo.GetByIdAsync(new WarehouseId(dto.Id)); 

            if (warehouse == null)
                return null;   

            // change all fields
            warehouse.ChangeDesignation(new Designation(dto.Designation));
            warehouse.ChangeAddress(new Address(dto.Street, dto.DoorNumber, dto.PostCode, dto.City));
            warehouse.ChangeCoordinates(new Coordinates(dto.Latitude, dto.Longitude, dto.Altitude));
            
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.toDTO(warehouse);
        }


        public async Task<WarehouseDto> InactivateAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id); 

            if (warehouse == null)
                return null;   

            warehouse.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.toDTO(warehouse);
        }

        public async Task<WarehouseDto> DeleteAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null)
                return null;

            if (warehouse.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active warehouse.");

            this._repo.Remove(warehouse);

            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.toDTO(warehouse);
        }
        
    }
}
    
