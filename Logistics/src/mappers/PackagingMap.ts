import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';

import IPackagingDTO from "../dto/IPackagingDTO";
import { Packaging } from "../domain/packaging/packaging";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PackagingMap extends Mapper<Packaging> {
  
  public static toDTO( packaging: Packaging): IPackagingDTO {
    return {
      id: packaging.id.toString(),
      truckId: packaging.truckId.toString(),
      positionX:packaging.props.position.x,
      positionY:packaging.props.position.y,
      positionZ:packaging.props.position.z,
      deliveryId: packaging.deliveryId,

    
    } as IPackagingDTO;
  }

  public static toDomain (packaging: any | Model<IPackagingPersistence & Document> ): Packaging {

    const packagingOrError = Packaging.create(
      packaging,
      new UniqueEntityID(packaging.domainId)
    );

    packagingOrError.isFailure ? console.log(packagingOrError.error) : '';
    return packagingOrError.isSuccess ? packagingOrError.getValue() : null;
  }

  public static toPersistence (packaging: Packaging): any {
    return {
      domainId: packaging.id.toString(),
      truckId: packaging.truckId.toString(),
      deliveryId: packaging.deliveryId, 
      positionX: packaging.position.x,
      positionY:  packaging.position.y,
      positionZ:  packaging.position.z,

    }
  }
}