import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  console.log('paso por el guard');

  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAithenticated().pipe(
    map((isAuth) => {
      // si esta autenticado puede ver el dashboard
      if(isAuth) return true;

      // Si no esta autenticado lo mando al login
      return router.createUrlTree(['/auth/login']);
  }));

};
