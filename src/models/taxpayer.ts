import { Device } from "./device";
import { Entity } from "./entity";

export class TaxPayer extends Entity{
     name :string
     tin:number
     serialNo:string
     phone:string
     deviceId:number
     device:Device
}