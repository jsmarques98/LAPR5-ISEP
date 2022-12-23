import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface MaxBatteryProps {
  value: number;
}

export class MaxBattery extends ValueObject<MaxBatteryProps> {
  get value (): number {
    
    return this.props.value;
  }
  
  private constructor (props: MaxBatteryProps) {
    super(props);
  }

  public static create (maxBattery: number): Result<MaxBattery> {
    if(maxBattery<=0){
      throw new Error("maxBattery needs to be greater than to 0");
     }
    const guardResult = Guard.againstNullOrUndefined(maxBattery, 'MaxBattery');
    if (!guardResult.succeeded) {
      throw new Error(guardResult.message);
    } else {
      return Result.ok<MaxBattery>(new MaxBattery({ value: maxBattery }))
    }
  }
  toString() {
    return String(this.props.value)
  }
}