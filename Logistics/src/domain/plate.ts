import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface PlateProps {
  value: string;
}

export class Plate extends ValueObject<PlateProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: PlateProps) {
    super(props);
  }

  public static create (plate: string): Result<Plate> {
    const guardResult = Guard.againstNullOrUndefined(plate, 'matricula');
    if (!guardResult.succeeded) {
      return Result.fail<Plate>(guardResult.message);
    } else {
      return Result.ok<Plate>(new Plate({ value: plate }))
    }
  }

  toString() {
    return String(this.props.value)
  }
}