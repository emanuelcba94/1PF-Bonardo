import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UsersComponent,
    FormDialogComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule, 
    UsersRoutingModule
  ], 
  exports: [
    UsersComponent
  ],
  providers: [
  
  ]
})
export class UsersModule { }
