import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { User } from '../../../core/models';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {

  public users: Observable<User[]>;
  public destroyed = new Subject<boolean>();

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private notifier: NotifierService
  ) {
    this.userService.loadUsers();
    this.users = this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  // ABRIR MODAL // CREAR USUARIO
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
            this.notifier.showSuccess('Se creo correctamente');

            this.userService.createUser({
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname,
            });
          }
        }
      })
  }

  // ELIMINAR USUARIO
  onDeleteUser(userToDelete: User): void {
    if (confirm(`¿Seguro desea eliminar a ${userToDelete.name}?`)) {
      this.userService.deleteUserById(userToDelete.id);
    }
    this.notifier.showError('Eliminado correctamente');
  }

  // EDITAR USUARIO
  onEditUser(userToEdit: User): void {
    console.log(userToEdit)

    this.matDialog
      .open(FormDialogComponent, {
        data: userToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          if (userUpdated) {
            this.userService.updateUserById(userToEdit.id, userUpdated);
          }
          this.notifier.showSuccess('Usuario Actualizado');
        }
      })
  };
}
