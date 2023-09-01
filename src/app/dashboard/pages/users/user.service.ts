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


  loadUsers(): void {
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', 
    {}).subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notifier.showErrorServer('Error al cargar los usuarios');
      },
      complete: () => {},
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


  createUser(payload: CreateUserData): void {
    const token = generateRandomString(20);
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


  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    this.httpClient.put(environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next: (usuarioActualizado) => 
      this.loadUsers(),
    })
  }


  deleteUserById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/users/' + id).pipe(
      mergeMap(
        (responseUserDelete) => this.users$.pipe(take(1), map((arrayActual) => arrayActual.filter((u) => u.id !== id))
        )
      )
    ).subscribe({
      next: ((arrayActualizado) => this._users$.next(arrayActualizado)),
    })
    this.users$.pipe(take(1))
  }
}