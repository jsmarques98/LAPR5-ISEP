import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DurationProps {
  value: number;
}

export class Duration extends ValueObject<DurationProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: DurationProps) {
    super(props);
  }

  public static create (duration: number): Result<Duration> {
    if(duration<0){
      throw new Error("duration needs to be greater than to 0");
     }
    const guardResult = Guard.againstNullOrUndefined(duration, 'duration');
    if (!guardResult.succeeded) {
      throw new Error("duration needs to be instantiated");
    } else {
      return Result.ok<Duration>(new Duration({ value: duration }))
    }
  }

  public toString():string {
    return String(this.props.value)
  }
}