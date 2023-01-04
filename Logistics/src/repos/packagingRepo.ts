import { Service, Inject } from 'typedi';

import IPackagingRepo from '../services/IRepos/IPackagingRepo';
import { Packaging } from "../domain/packaging/packaging";
import { PackagingId } from "../domain/packaging/packagingId";
import { PackagingMap } from "../mappers/PackagingMap";

import { Collection, Document, FilterQuery, Model } from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';


@Service()
export default class packagingRepo implements IPackagingRepo{
  private models: any;

  constructor(
    @Inject('packagingSchema') private packagingSchema : Model<IPackagingPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(packaging: Packaging): Promise<boolean> {
    
    const idX = packaging.id instanceof PackagingId ? (<PackagingId>packaging.id).toValue() : packaging.id;

    const query = { domainId: idX}; 
    const truckDocument = await this.packagingSchema.findOne( query as FilterQuery<IPackagingRepo & Document>);

    return !!truckDocument === true;
  }

  public async save (packaging: Packaging): Promise<Packaging> {
    const query = { domainId: packaging.id.toString()}; 
    const packagingDocument = await this.packagingSchema.findOne(query);
    console.log(packagingDocument)
    console.log("merda")
    try {
      if (packagingDocument === null ) {
       
        const rawPackaging: any = PackagingMap.toPersistence(packaging);
        const packagingCreated = await this.packagingSchema.create(rawPackaging);

        return PackagingMap.toDomain(packagingCreated);
      } else {
        
       // packagingDocument.truckId = packaging.truckId.toString;

        packagingDocument.deliveryId = packaging.deliveryId;

        packagingDocument.positionX = packaging.position.x;
        packagingDocument.positionX = packaging.position.y;


        await packagingDocument.save();
        return packaging;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (packagingId: PackagingId
   | string): Promise<Packaging> {
    const query = { domainId: packagingId};
    const truckRecord = await this.packagingSchema.findOne( query as FilterQuery<IPackagingPersistence & Document> );

    if( truckRecord != null) {
      return PackagingMap.toDomain(truckRecord);
    }
    else
      return null;
  }

 

   public async findAll(): Promise<Packaging[]> {
    const truckRecord = await this.packagingSchema.find();
    return truckRecord !== null ? truckRecord.map((postRecord) => PackagingMap.toDomain(postRecord)): null  
}
}