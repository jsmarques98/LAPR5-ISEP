import { IPlanningPersistence } from '../../dataschema/IPlanningPersistence';
import mongoose from 'mongoose';

const PlanningSchema = new mongoose.Schema({
    domainId: { type: String, unique: true },
    truckName:{type: String},
    deliveryDate:{type: String},
    deliveryId: {type: [String]},

    time: {type: Number},
  },
  { timestamps: true},
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning', PlanningSchema);