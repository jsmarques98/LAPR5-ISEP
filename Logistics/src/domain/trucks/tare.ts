import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TareProps {
  value: string;
}

export class Tare extends ValueObject<TareProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: TareProps) {
    super(props);
  }

  public static create (tare: string): Result<Tare> {
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