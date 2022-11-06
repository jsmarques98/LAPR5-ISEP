import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DistanceProps {
  value: number;
}

export class Distance extends ValueObject<DistanceProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: DistanceProps) {
    super(props);
  }

  public static create (distance: number): Result<Distance> {
    if(distance<0){
      return Result.fail<Distance>("distance needs to be greater than to 0");
     }
    const guardResult = Guard.againstNullOrUndefined(distance, 'distance');
    if (!guardResult.succeeded) {
      return Result.fail<Distance>(guardResult.message);
    } else {
      return Result.ok<Distance>(new Distance({ value: distance }))
    }
  }

  public toString():string {
    return String(this.props.value)
  }
}