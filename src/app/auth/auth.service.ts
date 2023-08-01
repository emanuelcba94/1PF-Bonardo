import { Injectable } from '@angular/core';
import { LoginPanel } from './models';
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from '../core/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();


  constructor(private notifier: NotifierService, private router: Router) { }


  // Para el GUARD
  isAithenticated(): Observable<boolean> {
    return this.authUser$.pipe(
      take(1),
      map((user) => user ? true : false));
  }

  // Funcion login
  login(panel: LoginPanel): void {
    const MOCK_USER: User = {
      id: 50,
      name: 'Emanuel',
      surname: 'Bonardo',
      email: 'emanuelb@fake.com',
      password: '12345',
    }


    if (panel.email === MOCK_USER.email && panel.password === MOCK_USER.password) {
      // Login valido
      this._authUser$.next(MOCK_USER);
      // Redireccionar al dashboard
      this.router.navigate(['/dashboard'])
    } else {
      this.notifier.showErrorLogin('Email o contraseña invalidos')
      this._authUser$.next(null);
    }


  }
}
