import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck";
import { TruckId } from "../../domain/truckId";

export default interface ITruckRepo extends Repo<Truck> {
  save(truck: Truck): Promise<Truck>;
  findByDomainId (truckId: TruckId | string): Promise<Truck>;
  findByPlate (truckPlate: string): Promise<Truck>;
  findAll (): Promise<Truck[]>;
}