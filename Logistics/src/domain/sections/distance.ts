import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DistanceProps {
  value: string;
}

export class Distance extends ValueObject<DistanceProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: DistanceProps) {
    super(props);
  }

  public static create (distance: string): Result<Distance> {
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