import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface MaxBatteryProps {
  value: string;
}

export class MaxBattery extends ValueObject<MaxBatteryProps> {
  get value (): string {
    
    return this.props.value;
  }
  
  private constructor (props: MaxBatteryProps) {
    super(props);
  }

  public static create (maxBattery: string): Result<MaxBattery> {
    const guardResult = Guard.againstNullOrUndefined(maxBattery, 'MaxBattery');
    if (!guardResult.succeeded) {
      return Result.fail<MaxBattery>(guardResult.message);
    } else {
      return Result.ok<MaxBattery>(new MaxBattery({ value: maxBattery }))
    }
  }
  toString() {
    return String(this.props.value)
  }
}