import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './components/base.component';
import { CarDetailsComponent } from './components/car-list/car-details/car-details.component';
import { CarListComponent } from './components/car-list/car-list.component';

const routes: Routes = [
  {
    path: 'cars-list',
    component: BaseComponent,
    children: [
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
    redirectTo: '/cars-list'
  }
];

export const RouteRoutes = RouterModule.forRoot(routes);
