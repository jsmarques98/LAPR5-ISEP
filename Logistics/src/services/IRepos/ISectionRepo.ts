import { Repo } from "../../core/infra/Repo";
import { Section } from "../../domain/sections/section";
import { SectionId } from "../../domain/sections/sectionId";

export default interface ISectionRepo extends Repo<Section> {
  save(section: Section): Promise<Section>;
  findByDomainId (sectionId: SectionId | string): Promise<Section>;
  findAll (): Promise<Section[]>;
}