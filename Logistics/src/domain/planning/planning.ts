import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Plate } from "../trucks/plate";
import IPlanningDTO from "../../dto/IPlanningDTO";


interface PlanningProps {
  truckName: String;
  deliveryDate: String;
  deliveryId: [String];
  time: number;
}

export class Planning extends AggregateRoot<PlanningProps> {
  get truckName(): String {
    return this.props.truckName;
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
    const planning = new Planning({ truckName:(planningDTO.truckName), deliveryDate: planningDTO.deliveryDate, deliveryId: planningDTO.deliveryId, time: planningDTO.time});

    return Result.ok<Planning>( planning );
}
}