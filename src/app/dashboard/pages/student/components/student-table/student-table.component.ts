import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../models';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  public displayedColumns = ['id', 'name', 'surname', 'identity', 'registration', 'actions'];

  @Input()
  dataSource: Student[] = [];
  
}
