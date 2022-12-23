import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { SectionId } from "./sectionId";
import { EnergySpent } from "./energySpent";
import { Duration } from "./duration";
import { ExtraTime } from "./extraTime";
import { Distance } from "./distance";


import ISectionDTO from "../../dto/ISectionDTO";
import { WareHouses } from "./warehouses";


interface SectionProps {
  duration: Duration;
  distance: Distance; 
  energySpent: EnergySpent;
  extraTime: ExtraTime;
  warehouses: WareHouses,

}

export class Section extends AggregateRoot<SectionProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

  get sectionId (): SectionId {
    return new SectionId(this.sectionId.toValue());
  }

  get duration (): Duration {
    return this.props.duration;
  }
  
  get distance(): Distance{
    return this.props.distance;
  }

  get energySpent(): EnergySpent {
    return this.props.energySpent;
  }


  get extraTime(): ExtraTime {
    return this.props.extraTime;
  }

  
  get warehouses() : WareHouses {
    return this.props.warehouses;
  }
  
 

  public set duration(v : Duration) {
   this.duration = v;
  }

  public set distance(v : Distance) {
    this.distance = v;
   }
  
  public set energySpent(v : EnergySpent) {
    this.energySpent = v;
  }
  
  public set extraTime(v : ExtraTime) {
    this.extraTime = v;
  }

  public set warehouseOrigin(v : string) {
    this.warehouseOrigin = v;
  }

  public set warehouseDestiny(v : string) {
    this.warehouseDestiny = v;
  }
  
  private constructor (props: SectionProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create (sectionDTO: ISectionDTO, id?: UniqueEntityID): Result<Section> {
    try{
      const section = new Section({ duration: Duration.create(sectionDTO.duration).getValue(),distance: Distance.create(sectionDTO.distance).getValue(),
        energySpent: EnergySpent.create(sectionDTO.energySpent).getValue(), extraTime: ExtraTime.create(sectionDTO.extraTime).getValue(),
      warehouses: WareHouses.create(sectionDTO.warehouseOrigin,sectionDTO.warehouseDestiny).getValue()}, id);

      return Result.ok<Section>( section )
       }catch(err){
      return  Result.fail<Section>(err.message)
    }
  }
}
