import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { MarketService } from '../../shared/services/market.service';
import { Market } from '../../core/models/market';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  usdRate: number = 0;
  gbpRate: number = 0;
  eurRate: number = 0;

  markets: Market[] = [];
  searchText: string = '';

  private updateRatesSubscription: Subscription = new Subscription();

  constructor(private marketService: MarketService, private currencyService: CurrencyService) { }

  ngOnInit() {
    this.marketService.markets$.subscribe((markets: Market[]) => {
      this.markets = markets;
    });

    this.updateRates();
    this.updateRatesSubscription = timer(0, 30 * 60 * 1000).subscribe(() => this.updateRates());
  }

  ngOnDestroy() {
    if (this.updateRatesSubscription) {
      this.updateRatesSubscription.unsubscribe();
    }
  }

  updateRates() {
    this.currencyService.getRates().subscribe({
      next: data => {
        this.usdRate = data.conversion_rates.TRY;  // 1 USD kaç TRY
      this.gbpRate = data.conversion_rates.TRY / data.conversion_rates.GBP;  // 1 GBP kaç TRY
      this.eurRate = data.conversion_rates.TRY / data.conversion_rates.EUR
      },
      error: err => {
        console.error('Error fetching rates:', err.message);
        alert('Döviz kurları alınırken bir hata oluştu, lütfen daha sonra tekrar deneyin.');
      }
    });
  }
}
