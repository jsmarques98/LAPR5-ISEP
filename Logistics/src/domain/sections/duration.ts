import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DurationProps {
  value: string;
}

export class Duration extends ValueObject<DurationProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: DurationProps) {
    super(props);
  }

  public static create (duration: string): Result<Duration> {
    const guardResult = Guard.againstNullOrUndefined(duration, 'duration');
    if (!guardResult.succeeded) {
      return Result.fail<Duration>(guardResult.message);
    } else {
      return Result.ok<Duration>(new Duration({ value: duration }))
    }
  }

  public toString():string {
    return String(this.props.value)
  }
}