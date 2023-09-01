import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { User } from '../../../../../core/models';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'fullNamePipe', 'email', 'password', 'role', 'actions'];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>(); 

  @Output()
  editUser = new EventEmitter<User>(); 
}
