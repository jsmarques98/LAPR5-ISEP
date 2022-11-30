import { IPlanningPersistence } from '../../dataschema/IPlanningPersistence';
import mongoose from 'mongoose';

const PlanningSchema = new mongoose.Schema(
  {
    truckPlate:{type: String},
    deliveryDate:{type: String},
  },
  { timestamps: true},
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning', PlanningSchema);