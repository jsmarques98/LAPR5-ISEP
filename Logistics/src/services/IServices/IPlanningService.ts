import { Result } from "../../core/logic/Result";
import IPlanningDTO from "../../dto/IPlanningDTO";
import IPlanningGeneticDTO from "../../dto/IPlanningGeneticDTO";

export default interface IPlanningService  {
  getBestRoute(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>
  getRouteHeuristicTime(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>
  getRouteHeuristicMass(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>
  getRouteHeuristicTimeAndMass(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> 
  getGenetic(planningDTO: IPlanningGeneticDTO): Promise<Result<IPlanningGeneticDTO>> 
}