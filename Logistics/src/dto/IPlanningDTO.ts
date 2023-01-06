import { List } from "lodash";

export default interface IPlanningDTO {
    domainId: string,

    truckName: string;
    deliveryDate:string;
    deliveryId: [string]; 
    time: number;
}