import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BaterryChargingTimeProps {
  value: number;
}

export class BaterryChargingTime extends ValueObject<BaterryChargingTimeProps> {
  
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: BaterryChargingTimeProps) {
    super(props);
  }

  public static create (baterryChargingTime: number): Result<BaterryChargingTime> {

    if(baterryChargingTime<=0){
      return Result.fail<BaterryChargingTime>("baterryChargingTime needs to be greater than to 0");
     }
    const guardResult = Guard.againstNullOrUndefined(baterryChargingTime, 'baterryChargingTime');
    if (!guardResult.succeeded) {
      return Result.fail<BaterryChargingTime>(guardResult.message);
    } else {
      return Result.ok<BaterryChargingTime>(new BaterryChargingTime({ value: baterryChargingTime }))
    }
  }

  toString() {
    return String(this.props.value)
  }
}