import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ExtraTimeProps {
  value: string;
}

export class ExtraTime extends ValueObject<ExtraTimeProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: ExtraTimeProps) {
    super(props);
  }

  public static create (extraTime: string): Result<ExtraTime> {
    const guardResult = Guard.againstNullOrUndefined(extraTime, 'extraTime');
    if (!guardResult.succeeded) {
      return Result.fail<ExtraTime>(guardResult.message);
    } else {
      return Result.ok<ExtraTime>(new ExtraTime({ value: extraTime }))
    }
  }

  public toString():string {
    return String(this.props.value)
  }
}