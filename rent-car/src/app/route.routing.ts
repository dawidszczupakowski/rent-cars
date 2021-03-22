import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './components/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'cars-list',
        // component: CarListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

export const RouteRoutes = RouterModule.forRoot(routes);
