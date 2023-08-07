import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Courses } from '../models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent {
  public displayedColumns =  ['id', 'name', 'description', 'price', 'dedication', 'actions'];

  @Input()
  dataSource: Courses[] = [];

  @Output()
  editCourse = new EventEmitter<Courses>(); 

  @Output()
  deleteCourse = new EventEmitter<Courses>(); 
}
