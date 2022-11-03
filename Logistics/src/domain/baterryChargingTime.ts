import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface BaterryChargingTimeProps {
  value: string;
}

export class BaterryChargingTime extends ValueObject<BaterryChargingTimeProps> {
  
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: BaterryChargingTimeProps) {
    super(props);
  }

  public static create (baterryChargingTime: string): Result<BaterryChargingTime> {
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