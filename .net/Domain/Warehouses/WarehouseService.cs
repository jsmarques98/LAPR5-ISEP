using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseService
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
            
            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(war => new WarehouseDto{Id = war.Id.AsGuid(), Description = war.Description});

            return listDto;
        }

        public async Task<WarehouseDto> GetByIdAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id);
            
            if(war == null)
                return null;

            return new WarehouseDto{Id = war.Id.AsGuid(), Description = war.Description};
        }

        public async Task<WarehouseDto> AddAsync(CreatingWarehouseDto dto)
        {
            var warehouse = new Warehouse(dto.Description);

            await this._repo.AddAsync(warehouse);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = warehouse.Id.AsGuid(), Description = warehouse.Description };
        }

        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var warehouse = await this._repo.GetByIdAsync(new WarehouseId(dto.Id)); 

            if (warehouse == null)
                return null;   

            // change all field
            warehouse.ChangeDescription(dto.Description);
            
            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = warehouse.Id.AsGuid(), Description = warehouse.Description };
        }

        public async Task<WarehouseDto> InactivateAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id); 

            if (warehouse == null)
                return null;   

            // change all fields
            warehouse.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = warehouse.Id.AsGuid(), Description = warehouse.Description };
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

            return new WarehouseDto { Id = warehouse.Id.AsGuid(), Description = warehouse.Description };
        }
    }
}