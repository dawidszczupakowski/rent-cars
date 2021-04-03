import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/materials.module';
import { SharedModule } from 'src/app/shared.module';
import { AdminRouteRoutes } from './admin.routing';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ToAcceptComponent } from './admin-panel/to-accept/to-accept.component';
import { RentedComponent } from './admin-panel/rented/rented.component';
import { CarsComponent } from './admin-panel/cars/cars.component';
import { ConfirmRentComponent } from './admin-panel/to-accept/confirm-rent/confirm-rent.component';
import { RejectRentComponent } from './admin-panel/to-accept/reject-rent/reject-rent.component';
import { ClientsComponent } from './admin-panel/clients/clients.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRouteRoutes,
    MaterialsModule
  ],
  declarations: [
    AdminPanelComponent,
    LoginComponent,
    ToAcceptComponent,
    RentedComponent,
    CarsComponent,
    ConfirmRentComponent,
    RejectRentComponent,
    ClientsComponent
  ]
})
export class AdminPanelModule { }
