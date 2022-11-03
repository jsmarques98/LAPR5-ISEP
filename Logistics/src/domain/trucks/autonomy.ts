import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AutonomyProps {
  value: string;
}

export class Autonomy extends ValueObject<AutonomyProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: AutonomyProps) {
    super(props);
  }

  public static create (autonomy: string): Result<Autonomy> {
    const guardResult = Guard.againstNullOrUndefined(autonomy, 'autonomy');
    if (!guardResult.succeeded) {
      return Result.fail<Autonomy>(guardResult.message);
    } else {
      return Result.ok<Autonomy>(new Autonomy({ value: autonomy }))
    }
  }
  public toString() : string{
    return String(this.props.value)
  }
}