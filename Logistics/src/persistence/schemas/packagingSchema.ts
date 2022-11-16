import { IPackagingPersistence } from '../../dataschema/IPackagingPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    positionX: { type: Number },
    positionY:{type: Number},
    positionZ:{type: Number,},
    truckId:{type: String},
    deliveryId:{type: String},
  },
  { timestamps: true},
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', TruckSchema);