import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    StudentComponent,
    StudentFormComponent,
    StudentTableComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class StudentModule { }
