import { List } from "lodash";

export default interface IPlanningDTO {
    truckName: string;
    deliveryDate:string;
    deliveryId: Array<string>; 
    time: number;
}