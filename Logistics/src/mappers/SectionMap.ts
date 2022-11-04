import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ISectionPersistence } from '../dataschema/ISectionPersistence';

import ISectionDTO from "../dto/ISectionDTO";
import { Section } from "../domain/sections/section";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class SectionMap extends Mapper<Section> {
  
  public static toDTO( section: Section): ISectionDTO {
    return {
      id: section.id.toString(),
      duration: section.duration.toString(),
      distance: section.distance.toString(), 
      energySpent: section.energySpent.toString(),
      extraTime: section.extraTime.toString(),
      warehouseDestiny: section.warehouses.warehouseDestiny,
      warehouseOrigin: section.warehouses.warehouseOrigin,
    } as ISectionDTO;
  }

  public static toDomain (section: any | Model<ISectionPersistence & Document> ): Section {
    const sectionOrError = Section.create(
      section,
      new UniqueEntityID(section.domainId)
    );

    sectionOrError.isFailure ? console.log(sectionOrError.error) : '';

    return sectionOrError.isSuccess ? sectionOrError.getValue() : null;
  }

  public static toPersistence (section: Section): any {
    return {
      domainId: section.id.toString(),
      duration: section.duration.value,
      distance: section.distance.value, 
      energySpent: section.energySpent.value,
      extraTime: section.extraTime.value,
      warehouseDestiny: section.warehouses.warehouseDestiny,
      warehouseOrigin: section.warehouses.warehouseOrigin,
    }
  }
}