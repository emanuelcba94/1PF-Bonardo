import { Component } from '@angular/core';
import { Student } from '../../models';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  public dataSource: Student[] = [];
  public displayedColumns = ['id', 'name', 'surname', 'identity', 'registration'];


}
