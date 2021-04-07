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
import { RejectRentComponent } from './admin-panel/shared/reject-rent/reject-rent.component';
import { ClientsComponent } from './admin-panel/clients/clients.component';
import { DetailsDialogComponent } from './admin-panel/shared/details-dialog/details-dialog.component';
import { EndRentDialogComponent } from './admin-panel/shared/end-rent-dialog/end-rent-dialog.component';
import { CarDetailsDialogComponent } from './admin-panel/cars/car-details-dialog/car-details-dialog.component';
import { AddCarDialogComponent } from './admin-panel/cars/add-car-dialog/add-car-dialog.component';
import { ActiveDesactiveCarDialogComponent } from './admin-panel/cars/active-desactive-car-dialog/active-desactive-car-dialog.component';

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
    ClientsComponent,
    DetailsDialogComponent,
    EndRentDialogComponent,
    CarDetailsDialogComponent,
    AddCarDialogComponent,
    ActiveDesactiveCarDialogComponent
  ]
})
export class AdminPanelModule { }
