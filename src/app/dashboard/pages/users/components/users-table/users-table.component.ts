import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { User } from '../../../../../core/models';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'fullNamePipe', 'email', 'password', 'actions'];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>(); 

  @Output()
  editUser = new EventEmitter<User>(); 
}
