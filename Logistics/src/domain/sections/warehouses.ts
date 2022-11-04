import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface WareHousesProps {
    warehouseOrigin: string;
    warehouseDestiny: string;
}

export class WareHouses extends ValueObject<WareHousesProps> {
  get warehouseOrigin (): string {
    return this.props.warehouseOrigin;
  }

  get warehouseDestiny (): string {
    return this.props.warehouseDestiny;
  }
  
  private constructor (props: WareHousesProps) {
    super(props);
  }

  public static create (value: string,value1: string): Result<WareHouses> {
    const guardResult = Guard.againstNullOrUndefined(value, 'warehouseOrigin');
    if (!guardResult.succeeded) {
      return Result.fail<WareHouses>(guardResult.message);
    } 
    const guardResult1 = Guard.againstNullOrUndefined(value1, 'warehouseDestiny');
    if (!guardResult.succeeded) {
      return Result.fail<WareHouses>(guardResult1.message);
    } 
      return Result.ok<WareHouses>(new WareHouses({ warehouseOrigin: value, warehouseDestiny:value1}))
    }
  
  public toString():string {
    return String("warehouseDestiny: "+this.props.warehouseDestiny+"warehouseOrigin: "+this.props.warehouseOrigin)
  }
}