import { MarketItem } from "./marketItems";

export class Market{
    id?:number ;
    name:string = "";
    items: MarketItem[];
    
    constructor(){
        this.items = new Array<MarketItem>()
    }
}