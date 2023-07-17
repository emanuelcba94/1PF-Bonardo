import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';



@NgModule({
  declarations: [
    UsersComponent,
    FormDialogComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ], 
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
