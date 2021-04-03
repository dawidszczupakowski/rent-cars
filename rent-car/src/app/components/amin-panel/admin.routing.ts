import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { LoginGuard } from 'src/app/guard/login.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
      path: 'admin-panel',
      component: AdminPanelComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'login'
    }
  ];

export const AdminRouteRoutes = RouterModule.forChild(routes);
