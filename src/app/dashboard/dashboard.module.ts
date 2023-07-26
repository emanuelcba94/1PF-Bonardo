import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
// dashboard, home, users 
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './pages/home/home.module';
import { UsersModule } from './pages/users/users.module';
// shared
import { SharedModule } from '../shared/shared.module';
// angular material components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    HomeModule,
    UsersModule,
    MatListModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
