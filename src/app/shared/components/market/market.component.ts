import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Type } from '../../../core/models/type';
import { Market } from '../../../core/models/market';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketItem } from '../../../core/models/marketItems';
import { Aisle } from '../../../core/models/aisle';
import { Product } from '../../../core/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
  standalone : true,
  imports:[CommonModule,FormsModule]
})
export class MarketComponent implements OnInit {
  @Input() types: Type[] = [];
  @Input() market: Market = new Market();
  @Input() index: number = 0;
  @Output() marketChange = new EventEmitter<Market>();

  marketItem:MarketItem = new MarketItem();
  selectedItemIndex:number = 0
  selectedProductIndex:number = 0
  product:Product = new Product();
  markets: Market[] = [];
  selectedMarket:Market = new Market();
  filtredMarket:Market = new Market();
  selectedType : Type = new Type();
  marketId:number = 0
  
  private subscription: Subscription = new Subscription();
  
  constructor(private marketService : MarketService) { }

  ngOnInit() {
  }

  setAisle(){
    this.market.items.push(this.marketItem)
    this.marketChange.emit(this.market);
  }

  setMarketItem() {
    this.marketItem = new MarketItem()

    let marketItems: MarketItem[] = this.market.items;
  
    let lastMarketItem = marketItems[marketItems.length - 1];
  
    if (lastMarketItem) {
      this.marketItem.aisle = {
        id: (lastMarketItem.aisle?.id ?? 0) + 1,
        name: (lastMarketItem.aisle?.name ?? 0) + 1 
      };
      this.marketItem.marketId = this.market.id
    } 
  }
  
  selectItemsIndex(j:number){
    this.selectedItemIndex = j;
    this.product = new Product();
  }

 

  
  setProduct(){
    this.product.marketId = this.market.id
    this.product.aisle = this.market.items[this.selectedItemIndex].aisle
    this.market.items[this.selectedItemIndex].products.push(this.product)
    this.marketChange.emit(this.market);    
  }
  deleteProductFromTable(i:number){
    this.market.items.splice(i, 1);
  }

  deleteProduct() {
    let market = this.markets.find((m: Market) => m.id === this.marketId);
    if (market) {
      let item = market.items[this.selectedItemIndex];
      if (item && item.products) {
        item.products.splice(this.selectedProductIndex, 1);
      }
    }
  }
  

  selectMarket() {
    const filteredItems = this.selectedMarket.items.filter(item => item.type?.id === this.selectedType.id);
    this.filtredMarket = { ...this.selectedMarket, items: filteredItems }
  }

  selectItemsProductIndex(j:number,k:number,item:MarketItem,product:Product){
    this.product = new Product();
  
    this.selectedMarket = new Market()
    this.filtredMarket = new Market()
    this.marketId = item.marketId!
    this.selectedItemIndex = j;
    this.selectedProductIndex = k;

    this.selectedType = item.type!;
    this.product = {...product}

    this.subscription = this.marketService.markets$.subscribe(markets => {
      this.markets = markets;
    });
    
  }

  updateProduct(){

    if(this.filtredMarket.id == this.market.id){
      this.deleteProduct()
      let findAisle = this.market.items.find((a:MarketItem) => a.aisle.id == this.product.aisle.id)   
      findAisle?.products.push(this.product)
    }
    else{
      this.deleteProduct()
      for(let mrkt of this.markets){
        if(mrkt.id != this.market.id){
          let findAisle = mrkt.items.find((a:MarketItem) => a.aisle.id == this.product.aisle.id)   
          findAisle?.products.push(this.product)
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
