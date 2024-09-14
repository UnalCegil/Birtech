import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './app.layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { ProductFilterPipe } from '../shared/pipes/productFilterPipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AppLayoutComponent,
        TopbarComponent,
        ProductFilterPipe
    ],
    imports: [
        RouterModule,
        FormsModule,
        CommonModule
    ]
})
export class AppLayoutModule { }
