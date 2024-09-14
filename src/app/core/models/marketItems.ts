import { Aisle } from "./aisle";
import { Product } from "./product";
import { Type } from "./type";

export class MarketItem{
    id?: number;
    marketId?:number;
    aisle: Aisle;
    type?: Type;
    products: Product[];
  
    constructor() {
      this.products = new Array<Product>();
      this.aisle = new Aisle();
    }
}