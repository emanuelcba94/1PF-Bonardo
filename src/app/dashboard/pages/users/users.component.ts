import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  // {
  //   id: 1,
  //   name: 'marcos',
  //   surname: 'sancho',
  //   email: 'marcos@outlook.com',
  //   password: '12345',
  // }
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  public users: User[] = ELEMENT_DATA;

  constructor(
    private matDialog: MatDialog
  ) { }

  // funtion para abrir el modal Form-dialog
  onCreateUser(): void {
    this.matDialog
      // abrir modal
      .open(FormDialogComponent)
      // cuando se cierra
      .afterClosed()
      // hacer esto... guardar valor
      .subscribe({
        next: (v) => {
          if (v) {
            // this.users.push({
            //   id: this.users.length + 1,
            //   name: v.name,
            //   surname: v.surname,
            //   email: v.email,
            //   password: v.password,
            // })
            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: v.name,
                surname: v.surname,
                email: v.email,
                password: v.password,
              }
            ]
            console.log('Recibimos el valor: ', v)
          } else {
            console.log('Se cancelo')
          }
        }
      })
  }

  onDeleteUser(userToDelete: User): void {
    console.log(userToDelete)
    if(confirm(`¿Seguro desea eliminar a ${userToDelete.name}?`)){
      this.users = this.users.filter((u) => u.id !== userToDelete.id)
    }
  }

  onEditUser(userToEdit: User): void {
    console.log(userToEdit)

    this.matDialog
      .open(FormDialogComponent, {
        data: userToEdit
      })
      .afterClosed()
      .subscribe({
        next: (newData) => {
          console.log(newData)
          if(newData) {
            this.users = this.users.map((user) => {
              
              return user.id === userToEdit.id
              ? { ...user, ...newData }
              : user ;
            })
          }
        }
      })
  };
}
