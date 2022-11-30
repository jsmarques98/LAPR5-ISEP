import { List } from "lodash";

export default interface IPlanningDTO {
    truckPlate: string;
    deliveryDate:string;
    routeList: Array<string>; 
}