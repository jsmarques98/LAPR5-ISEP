import { Result } from "../../core/logic/Result";
import IPackagingDTO from "../../dto/IPackagingDTO";

export default interface IPackagingServiice  {
  createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  getPackaging (packagingId: string): Promise<Result<IPackagingDTO>>;
  getAllPackagings(): Promise<Result<IPackagingDTO[]>>
}
