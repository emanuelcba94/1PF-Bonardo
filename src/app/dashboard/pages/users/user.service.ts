import { Injectable, Pipe } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from '../../../core/models';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { generateRandomString } from 'src/app/shared/Utils/helpers';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  // CARGA LOS USUARIOS
  loadUsers(): void {
    // Con HTTP CLIENT:
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', 
    {
      // headers: new HttpHeaders({
      //   'token': '123456789'
      // }),
      // params: {
      //   page: 1,
      //   limit: 50,
      // }
    }).subscribe({
      next: (response) => {
        // console.log('RESPONSE', response)
        // OK
        this._users$.next(response);
      },
      error: () => {
        // ERROR
        this.notifier.showErrorServer('Error al cargar los usuarios');
      },
      complete: () => {
        // SE COMPLETO EL OBSERVABLE
      },
    })

  }


  getUsers(): Observable<User[]> {
    return this.users$;
  }


  getUsersById(id: number): Observable<User | undefined> {
    return this.users$.pipe(
      map((users) => users.find((u) => u.id === id)),
      take(1),
    )
  }


  // USUARIO CREADO
  createUser(payload: CreateUserData): void {

    const token = generateRandomString(20);

    // Con HTTP CLIENT:
    this.httpClient.post<User>(environment.baseApiUrl + '/users', {...payload, token})
      .pipe(
        mergeMap((userCreated) => this.users$.pipe(
          take(1),
          map((arrayActual) => [...arrayActual, userCreated]))
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);
        }
      })
  }

  // USUARIO ACTUALIZADO
  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    // Con HTTP CLIENT:
    this.httpClient.put(environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next: (usuarioActualizado) => 
      this.loadUsers(),
    })
  }

  // USUARIO ELIMINADO
  deleteUserById(id: number): void {
    // Con HTTP CLIENT:
    // observable 1 (se comunica con API)
    this.httpClient.delete(environment.baseApiUrl + '/users/' + id).pipe(
      mergeMap(
        // en este punto ya se realizo el 1
        (responseUserDelete) => this.users$.pipe(take(1), map((arrayActual) => arrayActual.filter((u) => u.id !== id))
        )
      )
    ).subscribe({
      next: ((arrayActualizado) => this._users$.next(arrayActualizado)),
    })
    // .subscribe({next: (userDeleted) => {console.log(userDeleted);}})
    // observable 2 
    this.users$.pipe(take(1))

  }
}