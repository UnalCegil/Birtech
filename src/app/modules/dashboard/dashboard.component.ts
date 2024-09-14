import { Component, OnInit } from '@angular/core';
import { Type } from '../../core/models/type';
import { Market } from '../../core/models/market';
import { MarketService } from '../../shared/services/market.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  types: Type[] = [];
  markets: Market[] = [];

  constructor(private marketService : MarketService) { }

  ngOnInit() {
    this.types = this.marketService.getTypes();

    this.marketService.markets$.subscribe((markets: Market[]) => {
      this.markets = markets;
    });
  }

  onMarketChange(updatedMarket: Market, index: number) {
    this.markets[index] = updatedMarket;
    this.marketService.updateMarkets(this.markets);
  }

  save(){
    
  }

}
