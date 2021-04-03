import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './components/base.component';
import { CarDetailsComponent } from './components/car-list/car-details/car-details.component';
import { CarListComponent } from './components/car-list/car-list.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./components/admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
      },
      {
        path: '',
        component: CarListComponent
      },
      {
        path: 'car-detail/:id',
        component: CarDetailsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const RouteRoutes = RouterModule.forRoot(routes);
