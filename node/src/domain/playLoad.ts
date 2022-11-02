import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface PlayLoadProps {
  value: string;
}

export class PlayLoad extends ValueObject<PlayLoadProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: PlayLoadProps) {
    super(props);
  }

  public static create (playLoad: string): Result<PlayLoad> {
    const guardResult = Guard.againstNullOrUndefined(playLoad, 'playLoad');
    if (!guardResult.succeeded) {
      return Result.fail<PlayLoad>(guardResult.message);
    } else {
      return Result.ok<PlayLoad>(new PlayLoad({ value: playLoad }))
    }
  }
}