import { Service, Inject } from 'typedi';

import ISectionRepo from '../services/IRepos/ISectionRepo';
import { Section } from "../domain/sections/section";
import { SectionId } from "../domain/sections/sectionId";
import { SectionMap } from "../mappers/SectionMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ISectionPersistence } from '../dataschema/ISectionPersistence';
import { Console } from 'console';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import internal from 'stream';

@Service()
export default class SectionRepo implements ISectionRepo {
  private models: any;

  constructor(
    @Inject('sectionSchema') private sectionSchema : Model<ISectionPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(section: Section): Promise<boolean> {
    
    const idX = section.id instanceof SectionId ? (<SectionId>section.id).toValue() : section.id;

    const query = { domainId: idX}; 
    const sectionDocument = await this.sectionSchema.findOne( query as FilterQuery<ISectionPersistence & Document>);

    return !!sectionDocument === true;
  }

  public async save (section: Section): Promise<Section> {
    const query = { domainId: section.id.toString()}; 
    const sectionDocument = await this.sectionSchema.findOne( query );
    try {
      if (sectionDocument === null ) {
     
        const rawSection: any = SectionMap.toPersistence(section);
        const sectionCreated = await this.sectionSchema.create(rawSection);
        return SectionMap.toDomain(sectionCreated);
      } else {
        sectionDocument.duration = section.duration.value;
        sectionDocument.distance = section.distance.value;
        sectionDocument.extraTime = section.extraTime.value;
        sectionDocument.energySpent = section.energySpent.value;
        await sectionDocument.save();
        return section;
      }
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  public async findByDomainId (sectionId: SectionId
   | string): Promise<Section> {
    const query = { SectionId: sectionId};
    const sectionRecord = await this.sectionSchema.findOne( query as FilterQuery<ISectionPersistence & Document> );

    if( sectionRecord != null) {
      return SectionMap.toDomain(sectionRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Section[]> {
    const sectionRecord = await this.sectionSchema.find();
    return sectionRecord !== null ? sectionRecord.map((postRecord) => SectionMap.toDomain(postRecord)): null  
  }

  public async find(skip:number,limit:number): Promise<Section[]> {
    const sectionRecord = await this.sectionSchema.find().skip(skip).limit(limit);
    return sectionRecord !== null ? sectionRecord.map((postRecord) => SectionMap.toDomain(postRecord)): null  
  }

  public async deleteById(sectionId:  SectionId):Promise<Boolean> {
   
    const query = { domainId: sectionId};
    const sectionRecord = await this.sectionSchema.findOne( query as FilterQuery<ISectionPersistence & Document> );

    if( sectionRecord != null) {
      await  sectionRecord.delete()
      return true;
    }
    else
      return false;
  }
    
 

}