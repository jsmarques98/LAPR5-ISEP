import { Result } from "../../core/logic/Result";
import IPlanningDTO from "../../dto/IPlanningDTO";

export default interface IPlanningService  {
  getBestRoute(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>
  getRouteHeuristicTime(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>
  getRouteHeuristicMass(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>
  getRouteHeuristicTimeAndMass(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> 
}