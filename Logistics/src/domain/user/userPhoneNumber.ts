
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserPhoneNumberProps {
  value: number;
}

export class UserPhoneNumber extends ValueObject<UserPhoneNumberProps> {
  
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: UserPhoneNumberProps) {
    super(props);
  }

  public static create (phoneNumber: number): Result<UserPhoneNumber> {
    const guardResult = Guard.againstNullOrUndefined(phoneNumber, 'phoneNumber');
    if (!guardResult.succeeded) {
      return Result.fail<UserPhoneNumber>(guardResult.message);
    } else {
      return Result.ok<UserPhoneNumber>(new UserPhoneNumber({ value: phoneNumber }))
    }
  }
}