import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: '**',
      redirectTo: '/login'
    }
  ];

export const AdminRouteRoutes = RouterModule.forChild(routes);
