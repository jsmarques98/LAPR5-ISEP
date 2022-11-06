import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnergySpentProps {
  value: number;
}

export class EnergySpent extends ValueObject<EnergySpentProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: EnergySpentProps) {
    super(props);
  }

  public static create (energySpent: number): Result<EnergySpent> {
    if(energySpent<0){
      return Result.fail<EnergySpent>("energySpent needs to be greater than to 0");
     }
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