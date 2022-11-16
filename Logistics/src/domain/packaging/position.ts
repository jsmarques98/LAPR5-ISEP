import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PositionProps {
  x: number;
  y: number;
  z: number;
}
function validateX (x: number): boolean {
  if (x>0 && x<10) {
  return true;
 }
}

function  validateY (y: number): boolean {
  if (y>0 && y<20) {
  return true;
 }
}

function  validateZ (z: number): boolean {
  if (z>0 && z<8) {
  return true;
 }
  return false;
}



export class Position extends ValueObject<PositionProps> {
 
  
  get x (): number {
    return this.props.x;
  }

  get y (): number {
    return this.props.y;
  }

  get z (): number {
    return this.props.z;
  }

  private constructor (props: PositionProps) {
    super(props);
  }

  public static create (valueX: number,valueY: number,valueZ:number): Result<Position> {
    const guardResult = Guard.againstNullOrUndefined(valueX, 'X');
    if (!guardResult.succeeded) {
      return Result.fail<Position>(guardResult.message);

    }
    if (!validateX(valueX)){
      return Result.fail<Position>("x must be greater than 0 or less than 10 ");
    }
    const guardResult1 = Guard.againstNullOrUndefined(valueY, 'y');
    if (!guardResult1.succeeded) {
        return Result.fail<Position>(guardResult1.message);
    }
    if (!validateY(valueY)){
      return Result.fail<Position>("Y must be greater than 0 or less than 20 ");
    }
    const guardResult2 = Guard.againstNullOrUndefined(valueZ, 'z');
    if (!guardResult2.succeeded) {
        return Result.fail<Position>(guardResult2.message);
    }
    if (!validateZ(valueZ)){
      return Result.fail<Position>("Z must be greater than 0 or less than 8 ");
    }

      return Result.ok<Position>(new Position({ x: valueX,y:valueY,z:valueZ }))
  }

  public toString():string {
    return String("X:"+this.props.x+"Y:"+this.props.y+"Z:"+this.props.z)
  }
}