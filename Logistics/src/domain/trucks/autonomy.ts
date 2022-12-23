import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AutonomyProps {
  value: number;
}

export class Autonomy extends ValueObject<AutonomyProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: AutonomyProps) {
    super(props);
  }

  public static create (autonomy: number): Result<Autonomy> {
   if(autonomy<0){
    throw new Error("autonomy needs to be greater than or equal to 0");
   }
    const guardResult = Guard.againstNullOrUndefined(autonomy, 'autonomy');
    if (!guardResult.succeeded) {
      throw new Error(guardResult.message);
    } else {
      return Result.ok<Autonomy>(new Autonomy({ value: autonomy }))
    }
  }
  public toString() : string{
    return String(this.props.value)
  }
}