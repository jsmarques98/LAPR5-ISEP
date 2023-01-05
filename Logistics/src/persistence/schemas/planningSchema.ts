import { IPlanningPersistence } from '../../dataschema/IPlanningPersistence';
import mongoose from 'mongoose';

const PlanningSchema = new mongoose.Schema(
  {
    truckPlate:{type: String},
    deliveryDate:{type: String},
    deliveryID: {type: Array<String>},
    time: {type: Number}
  },
  { timestamps: true},
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning', PlanningSchema);