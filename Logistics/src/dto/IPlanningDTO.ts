import { List } from "lodash";

export default interface IPlanningDTO {
    truckName: string;
    deliveryDate:string;
    routeList: Array<string>; 
}