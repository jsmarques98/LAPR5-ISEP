import { Repo } from "../../core/infra/Repo";
import { Planning } from "../../domain/planning/planning";


export default interface IPlanningRepo extends Repo<Planning> {
  save(planning: Planning): Promise<Planning>;

}