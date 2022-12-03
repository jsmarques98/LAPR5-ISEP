import { Repo } from "../../core/infra/Repo";
import { Plate } from "../../domain/trucks/plate";
import { Truck } from "../../domain/trucks/truck";
import { TruckId } from "../../domain/trucks/truckId";

export default interface ITruckRepo extends Repo<Truck> {
  save(truck: Truck): Promise<Truck>;
  findByDomainId (truckId: TruckId | string): Promise<Truck>;
  findByPlate (truckPlate: Plate): Promise<Truck>;
  findAll (): Promise<Truck[]>;
  deleteByPlate(truckPlate: Plate): Promise<Boolean>;
}