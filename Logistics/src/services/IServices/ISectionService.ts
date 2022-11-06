import { Result } from "../../core/logic/Result";
import ISectionDTO from "../../dto/ISectionDTO";

export default interface ISectionServiice  {
  createSection(sectionDTO: ISectionDTO): Promise<Result<ISectionDTO>>;
  updateSection(sectionDTO: ISectionDTO): Promise<Result<ISectionDTO>>;
  getAllSections(): Promise<Result<ISectionDTO[]>>
  getSection(id: string): Promise<Result<ISectionDTO>>
}
