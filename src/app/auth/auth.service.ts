import { Injectable } from '@angular/core';
import { LoginPanel } from './models';
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from '../core/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private httpClient: HttpClient,
    private store: Store
  ) { }


  isAithenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(map((usersResult) => {
      if(usersResult.length) {
          const authUser = usersResult[0];
          this.store.dispatch(AuthActions.setAuthUser({payload: authUser}));
      }
      return !!usersResult.length
    })
    )
  }


  login(payload: LoginPanel): void {
    this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        email: payload.email || '',
        password: payload.password || '',
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this.store.dispatch(AuthActions.setAuthUser({payload: authUser}));
          this.router.navigate(['/dashboard'])
          localStorage.setItem('token', authUser.token);
        } else {
          this.notifier.showErrorLogin('Email o contraseña invalidos')
          this.store.dispatch(AuthActions.setAuthUser({payload: null}));
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

  public logout(): void {
    this.store.dispatch(AuthActions.setAuthUser({payload: null}));
  }
}
