import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormComponent,
    CoursesTableComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
