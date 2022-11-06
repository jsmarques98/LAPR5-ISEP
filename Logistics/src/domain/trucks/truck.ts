import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { TruckId } from "./truckId";
import { MaxBattery } from "./maxBattery";
import { Autonomy} from "./autonomy";
import { PayLoad} from "./payLoad";
import {Tare} from "./tare";
import { BaterryChargingTime} from "./baterryChargingTime";
import { Plate } from "./plate";


import ITruckDTO from "../../dto/ITruckDTO";

interface TruckProps {
  name: string;
  maxBattery: MaxBattery; 
  autonomy: Autonomy;
  payLoad: PayLoad;
  tare: Tare;
  baterryChargingTime: BaterryChargingTime;
  plate: Plate;
}

export class Truck extends AggregateRoot<TruckProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

  get truckId (): TruckId {
    return new TruckId(this.truckId.toValue());
  }

  get name (): string {
    return this.props.name;
  }
  
  get autonomy(): Autonomy{
    return this.props.autonomy;
  }

  get maxBattery(): MaxBattery {
    return this.props.maxBattery;
  }

  

  get payLoad(): PayLoad {
    return this.props.payLoad;
  }

  get tare(): Tare {
    return this.props.tare;
  }

  get baterryChargingTime(): BaterryChargingTime {
    return this.props.baterryChargingTime;
  }

  get plate():Plate{
    return this.props.plate;
  }
  set name ( value: string) {
    this.props.name = value;
  } 

  set autonomy(value: Autonomy){
    this.props.autonomy=value;
  }
  set maxBattery(value: MaxBattery){
    this.props.maxBattery=value;
  }
  set payLoad(value: PayLoad){
    this.props.payLoad=value;
  }
  set tare(value: Tare){
    this.props.tare=value;
  }
  set baterryChargingTime(value: BaterryChargingTime){
    this.props.baterryChargingTime=value;
  }

  private constructor (props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create (truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {

    const name = truckDTO.name;

    if (!!name === false || name.length === 0) {
      return Result.fail<Truck>('Must provide a truck name')
    } else {

      const truck = new Truck({ name: name,maxBattery: MaxBattery.create(truckDTO.maxBattery).getValue(),
        autonomy: Autonomy.create(truckDTO.autonomy).getValue(), payLoad: PayLoad.create(truckDTO.payLoad).getValue(), tare: Tare.create(truckDTO.tare).getValue(),
        baterryChargingTime:  BaterryChargingTime.create(truckDTO.baterryChargingTime).getValue(),plate:  Plate.create(truckDTO.plate).getValue()}, id);
      return Result.ok<Truck>( truck )
    }
  }
}
