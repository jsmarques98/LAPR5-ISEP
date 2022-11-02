using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;

        

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<DeliveryDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<DeliveryDTO> listDto = list.ConvertAll<DeliveryDTO>(delivery => 
                new DeliveryDTO{Id = delivery.Id.AsString(),DeliveryDate = delivery.DeliveryDate.AsString(),
                LoadTime = delivery.LoadTime.Value(),UnloadTime =  delivery.UnloadTime.Value(),TotalWeight = delivery.TotalWeight.Value()});

            return listDto;
        }

        public async Task<DeliveryDTO> GetByIdAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id);
            
            if(delivery == null)
                return null;

            return  new DeliveryDTO{Id = delivery.Id.AsString(),DeliveryDate = delivery.DeliveryDate.AsString(),
                LoadTime = delivery.LoadTime.Value(),UnloadTime =  delivery.UnloadTime.Value(),TotalWeight = delivery.TotalWeight.Value()};

        }

        public async Task<DeliveryDTO> AddAsync(DeliveryDTO dto)
        {
            var delivery = new Delivery(dto.Id,new DeliveryDate(dto.DeliveryDate),new LoadTime(dto.LoadTime),new UnloadTime(dto.UnloadTime),new TotalWeight(dto.TotalWeight));

            await this._repo.AddAsync(delivery);

            await this._unitOfWork.CommitAsync();

            return  new DeliveryDTO{Id = delivery.Id.AsString(),DeliveryDate = delivery.DeliveryDate.AsString(),
                LoadTime = delivery.LoadTime.Value(),UnloadTime =  delivery.UnloadTime.Value(),TotalWeight = delivery.TotalWeight.Value()};

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
            
            await this._unitOfWork.CommitAsync();

            return  new DeliveryDTO{Id = delivery.Id.AsString(),DeliveryDate = delivery.DeliveryDate.AsString(),
                LoadTime = delivery.LoadTime.Value(),UnloadTime =  delivery.UnloadTime.Value(),TotalWeight = delivery.TotalWeight.Value()};
        }


        public async Task<DeliveryDTO> InactivateAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id); 

            if (delivery == null)
                return null;   

            delivery.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return  new DeliveryDTO{Id = delivery.Id.AsString(),DeliveryDate = delivery.DeliveryDate.AsString(),
                LoadTime = delivery.LoadTime.Value(),UnloadTime =  delivery.UnloadTime.Value(),TotalWeight = delivery.TotalWeight.Value()};

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

            return new DeliveryDTO{Id = delivery.Id.AsString(),DeliveryDate = delivery.DeliveryDate.AsString(),
                LoadTime = delivery.LoadTime.Value(),UnloadTime =  delivery.UnloadTime.Value(),TotalWeight = delivery.TotalWeight.Value()};
        }
    }
}