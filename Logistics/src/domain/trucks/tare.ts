import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TareProps {
  value: number;
}

export class Tare extends ValueObject<TareProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: TareProps) {
    super(props);
  }

  public static create (tare: number): Result<Tare> {
    if(tare<=0){
      return Result.fail<Tare>("tare needs to be greater than to 0");
     }
    const guardResult = Guard.againstNullOrUndefined(tare, 'tare');
    if (!guardResult.succeeded) {
      return Result.fail<Tare>(guardResult.message);
    } else {
      return Result.ok<Tare>(new Tare({ value: tare }))
    }
  }

  toString() {
    return String(this.props.value)
  }
}