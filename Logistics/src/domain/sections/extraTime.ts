import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ExtraTimeProps {
  value: number;
}

export class ExtraTime extends ValueObject<ExtraTimeProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: ExtraTimeProps) {
    super(props);
  }

  public static create (extraTime: number): Result<ExtraTime> {
    if(extraTime<0){
      throw new Error("extraTime needs to be greater than to 0");
     }
    const guardResult = Guard.againstNullOrUndefined(extraTime, 'extraTime');
    if (!guardResult.succeeded) {
      throw new Error("extraTime needs to be instantiated");
    } else {
      return Result.ok<ExtraTime>(new ExtraTime({ value: extraTime }))
    }
  }

  public toString():string {
    return String(this.props.value)
  }
}