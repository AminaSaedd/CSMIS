import { ComplainType } from "./complainType";
import { Entity } from "./entity";
import { TaxPayer } from "./taxpayer";

export class Complain extends Entity{
     phone :string
     taxPayerId:number
     taxPayer:TaxPayer
     complainTypeId:number
     complainType:ComplainType
     reportedIssue:string
     confirmedIssue :string
     implementedFixes:string
     usedSpareparts:string
     status:string
}