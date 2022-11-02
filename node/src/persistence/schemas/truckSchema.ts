import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    maxBattery:{type: String, unique:false},
    autonomy:{type: String, unique:false},
    playload:{type: String, unique:false},
    tare:{type: String, unique:false},
    baterryChargingTime:{type: String, unique:false},
    plate:{type: String, unique:true},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);

