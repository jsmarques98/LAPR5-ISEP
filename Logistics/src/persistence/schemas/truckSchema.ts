import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    maxBattery:{type: String},
    autonomy:{type: String,},
    playload:{type: String},
    tare:{type: String},
    baterryChargingTime:{type: String},
    plate:{type: String, unique:true},
  },
  { timestamps: true},
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);

