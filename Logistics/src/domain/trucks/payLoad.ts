import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PayLoadProps {
  value: number;
}

export class PayLoad extends ValueObject<PayLoadProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: PayLoadProps) {
    super(props);
  }

  public static create (payLoad: number): Result<PayLoad> {

    if(payLoad<=0){
      return Result.fail<PayLoad>("payLoad needs to be greater than to 0");
     }
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