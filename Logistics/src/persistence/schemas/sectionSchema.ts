import { ISectionPersistence } from '../../dataschema/ISectionPersistence';
import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique:true},
    duration: { type: String},
    distance:{type: String},
    extraTime:{type: String},
    energySpent:{type: String},
    warehouseDestiny:{type: String} ,
    warehouseOrigin:{type: String},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ISectionPersistence & mongoose.Document>('Section', SectionSchema);