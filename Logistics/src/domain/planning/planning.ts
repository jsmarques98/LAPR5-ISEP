import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Plate } from "../trucks/plate";
import IPlanningDTO from "../../dto/IPlanningDTO";


interface PlanningProps {
  truckPlate: Plate;
  deliveryDate: String;
  deliveryId: Array<String>;
  time: number;
}

export class Planning extends AggregateRoot<PlanningProps> {
  get truckPlate(): Plate {
    return this.props.truckPlate;
  }

  get deliveryDate(): String {
    return this.props.deliveryDate;
  }

  get deliveryId(): Array<String> {
    return this.props.deliveryId;
  }

  get time(): number {
    return this.props.time;
  }

  private constructor(props: PlanningProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (planningDTO: IPlanningDTO, id?: UniqueEntityID): Result<Planning> {
    const planning = new Planning({ truckPlate:Plate.create(planningDTO.truckPlate).getValue(), deliveryDate: planningDTO.deliveryDate, deliveryId: planningDTO.deliveryId, time: planningDTO.time});

    return Result.ok<Planning>( planning );
}
}