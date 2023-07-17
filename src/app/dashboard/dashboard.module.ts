import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// dashboard, home, users 
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './pages/home/home.module';
import { UsersModule } from './pages/users/users.module';
// shared
import { SharedModule } from '../shared/shared.module';
// angular material components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    HomeModule,
    UsersModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
