export default interface ITruckDTO {
    domainId: string;
    name: string;
    maxBattery: number; 
    autonomy: number;
    payLoad: number;
    tare: number;
    baterryChargingTime: number;
    plate: string;
}