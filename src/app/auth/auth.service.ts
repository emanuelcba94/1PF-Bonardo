import { Injectable } from '@angular/core';
import { LoginPanel } from './models';
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from '../core/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();


  constructor(
    private notifier: NotifierService,
    private router: Router,
    private httpClient: HttpClient,
  ) { }


  // Para el GUARD
  isAithenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(map((usersResult) => {
      return !!usersResult.length
    })
    )
  }

  // Funcion login
  login(payload: LoginPanel): void {

    this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        email: payload.email || '',
        password: payload.password || '',
      }
    }).subscribe({
      next: (response) => {
        // console.log(response)
        if (response.length) {
          const authUser = response[0];
          // Login valido
          this._authUser$.next(response[0])
          // Redireccionar al dashboard
          this.router.navigate(['/dashboard'])
          localStorage.setItem('token', authUser.token);
        } else {
          // Error 
          this.notifier.showErrorLogin('Email o contraseña invalidos')
          this._authUser$.next(null);
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.notifier.showErrorServer('Error inesperado');
          }
          if (err.status === 404) {
            this.notifier.showErrorServer('Error inesperado, servidor no encontrado');
          }
          if (err.status === 403) {
            this.notifier.showErrorServer('Error inesperado, servidor no encontrado');
          }
        }
      }
    })
  }
}
