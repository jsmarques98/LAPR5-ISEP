import { Repo } from "../../core/infra/Repo";
import { Packaging } from "../../domain/packaging/packaging";
import { PackagingId } from "../../domain/packaging/packagingId";

export default interface IPackagingRepo extends Repo<Packaging> {
  save(packaging: Packaging): Promise<Packaging>;
  findByDomainId (packagingId: PackagingId | string): Promise<Packaging>;
  findAll (): Promise<Packaging[]>;
}
