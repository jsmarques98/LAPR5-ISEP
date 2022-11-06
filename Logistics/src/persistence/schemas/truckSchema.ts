import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    maxBattery:{type: Number},
    autonomy:{type: Number,},
    payLoad:{type: Number},
    tare:{type: Number},
    baterryChargingTime:{type: Number},
    plate:{type: String, unique:true},
  },
  { timestamps: true},
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);

