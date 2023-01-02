import { Result } from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface ITruckServiice  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getTruck (truckId: string): Promise<Result<ITruckDTO>>;
  getAllTrucks(): Promise<Result<ITruckDTO[]>>
  deleteByPlate(plate: string): Promise<Result<String>>;
  inativeTruck( plate: string): Promise<Result<String>>;
  activateTruck( plate: string): Promise<Result<String>>;
  
}
