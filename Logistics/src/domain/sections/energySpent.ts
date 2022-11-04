import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnergySpentProps {
  value: string;
}

export class EnergySpent extends ValueObject<EnergySpentProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: EnergySpentProps) {
    super(props);
  }

  public static create (energySpent: string): Result<EnergySpent> {
    const guardResult = Guard.againstNullOrUndefined(energySpent, 'energySpent');
    if (!guardResult.succeeded) {
      return Result.fail<EnergySpent>(guardResult.message);
    } else {
      return Result.ok<EnergySpent>(new EnergySpent({ value: energySpent }))
    }
  }

  public toString():string {
    return String(this.props.value)
  }
}