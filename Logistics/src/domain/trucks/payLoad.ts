import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PayLoadProps {
  value: string;
}

export class PayLoad extends ValueObject<PayLoadProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: PayLoadProps) {
    super(props);
  }

  public static create (payLoad: string): Result<PayLoad> {
    const guardResult = Guard.againstNullOrUndefined(payLoad, 'payLoad');
    if (!guardResult.succeeded) {
      return Result.fail<PayLoad>(guardResult.message);
    } else {
      return Result.ok<PayLoad>(new PayLoad({ value: payLoad }))
    }
  }

  toString() {
    return String(this.props.value)
  }
}