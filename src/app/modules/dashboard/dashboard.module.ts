import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MarketComponent } from '../../shared/components/market/market.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MarketComponent
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
