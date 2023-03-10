import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { TruckId } from "../../domain/trucks/truckId";
import { PackagingId } from "./packagingId";
import IPackagingDTO from "../../dto/IPackagingDTO";
import { WareHouses } from "../../domain/sections/warehouses";
import { Position } from "./position";
import { Plate } from "../trucks/plate";

interface PackagingProps {
  truckPlate: Plate;
  deliveryId: string;
  position: Position;
}

export class Packaging extends AggregateRoot<PackagingProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

  get packagingId (): PackagingId {
    return new PackagingId(this.packagingId.toValue());
  }

  get truckPlate (): Plate {
    return this.props.truckPlate;
  }
  
  get deliveryId (): string {
    return this.props.deliveryId;
  }
  
  get position(): Position{
    return this.props.position;
  }

  public set truckId(v : TruckId) {
    this.truckId = v;
  }

  public set deliveryId(v : string) {
    this.deliveryId = v;
  }

  public set position(v : Position) {
    this.position = v;
  }

  
  private constructor (props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  
  public static create (packagingDTO: IPackagingDTO, id?: UniqueEntityID): Result<Packaging> {
      const packaging = new Packaging({ truckPlate:Plate.create(packagingDTO.truckPlate).getValue(),deliveryId: packagingDTO.deliveryId,
        position: Position.create(packagingDTO.positionX,packagingDTO.positionY,packagingDTO.positionZ).getValue()}, id);

      return Result.ok<Packaging>( packaging );
  }
  
}