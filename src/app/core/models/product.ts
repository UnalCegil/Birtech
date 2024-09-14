import { Aisle } from "./aisle";

export class Product {
    id?: string;
    name?: string;
    aisle:Aisle  
    marketId?:number
    constructor(){
      this.aisle = new Aisle()
    }
  }