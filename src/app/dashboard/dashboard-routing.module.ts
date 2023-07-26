import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailComponent } from './pages/users/pages/user-detail/user-detail.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            {
                path: 'home', component: HomeComponent,
            },
            {
                path: 'users', component: UsersComponent,
            },
            {
                path: 'users/:id', component: UserDetailComponent,
            },
            {
                path: '**', redirectTo:'home',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }