import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [ 
  // { path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: 'login', component: LoginComponent},
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)},
  // { path: '**', redirectTo: 'login', pathMatch: 'full'}

  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
