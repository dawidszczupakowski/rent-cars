import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import '@angular/common/locales/global/pl';

import { AppComponent } from './app.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BaseComponent } from './components/base.component';
import { RouteRoutes } from './route.routing';
import { HeaderComponent } from './shared/header/header.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailsComponent } from './components/car-list/car-details/car-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarRentDialogComponent } from './components/car-list/car-details/car-rent-dialog/car-rent-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmRentCarComponent } from './components/car-list/car-details/confirm-rent-car/confirm-rent-car.component';
import { RentCarSuccessComponent } from './components/car-list/car-details/rent-car-success/rent-car-success.component';
import { SharedModule } from './shared.module';
import { MaterialsModule } from './materials.module';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HeaderComponent,
    CarListComponent,
    CarDetailsComponent,
    CarRentDialogComponent,
    ConfirmRentCarComponent,
    RentCarSuccessComponent
  ],
  imports: [
    BrowserModule,
    RouteRoutes,
    SharedModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pl' },
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
