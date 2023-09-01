import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Courses } from '../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent {
  public displayedColumns =  ['id', 'name', 'description', 'price', 'dedication', 'actions'];

  public isAdmin$: Observable<boolean>;

  constructor(private store: Store)
  {
    this.isAdmin$ = this.store.select(selectIsAdmin);  
  }

  @Input()
  dataSource: Courses[] = [];

  @Output()
  editCourse = new EventEmitter<Courses>(); 

  @Output()
  deleteCourse = new EventEmitter<Courses>(); 
}
