import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from '../../../core/models';
import { BehaviorSubject, Observable, Subject, delay, of, take } from 'rxjs';


const USER_DB: Observable<User[]> = of([
  {
    id: 1,
    name: 'marcos',
    surname: 'sancho',
    email: 'marcos@outlook.com',
    password: '12345',
  },
  {
    id: 2,
    name: 'carlos',
    surname: 'perez',
    email: 'carlos@outlook.com',
    password: '12345',
  },
]).pipe(delay(1000));


@Injectable({
  providedIn: 'root'
})


export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();


  constructor() { }

  loadUsers(): void {
    USER_DB.subscribe({
      next: (usuariosFromDb) => this._users$.next(usuariosFromDb),
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  // ALUMNO CREADO
  createUser(user: CreateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([
          ...arrayActual,
          { ...user, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  // ALUMNO ACTUALIZADO
  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(
          arrayActual.map((u) =>
            u.id === id ? { ...u, ...usuarioActualizado } : u
          )
        );
      },
    });
  }

  // ALUMNO ELIMINADO
  deleteUserById(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(arrayActual.filter((u) => u.id !== id));
      },
    });
  }
}