import { Result } from "../../core/logic/Result";
import IPlanningDTO from "../../dto/IPlanningDTO";

export default interface IPlanningService  {
  getBestRoute(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>
}