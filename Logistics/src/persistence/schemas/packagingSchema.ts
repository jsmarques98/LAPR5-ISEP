import { IPackagingPersistence } from '../../dataschema/IPackagingPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    positionX: { type: String },
    positionY:{type: Number},
    positionZ:{type: Number,},
    truckId:{type: Number},
    deliveryId:{type: Number},
  },
  { timestamps: true},
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', TruckSchema);