import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AminPanelComponent } from './amin-panel.component';
import { MaterialsModule } from 'src/app/materials.module';
import { SharedModule } from 'src/app/shared.module';
import { AdminRouteRoutes } from './admin.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRouteRoutes,
    MaterialsModule
  ],
  declarations: [AminPanelComponent, LoginComponent]
})
export class AminPanelModule { }
