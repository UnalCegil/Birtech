import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
      // { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: '**', redirectTo: '/notfound' }
];

