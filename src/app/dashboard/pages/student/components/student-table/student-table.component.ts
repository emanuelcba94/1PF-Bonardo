import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  public displayedColumns = ['id', 'name', 'surname', 'email', 'actions'];

  public isAdmin$: Observable<boolean>;

  constructor(private store: Store)
  {
    this.isAdmin$ = this.store.select(selectIsAdmin);  
  }

  @Input()
  dataSource: Student[] = [];
  
  @Output()
  editStudent = new EventEmitter<Student>(); 

  @Output()
  deleteStudent = new EventEmitter<Student>(); 
}
