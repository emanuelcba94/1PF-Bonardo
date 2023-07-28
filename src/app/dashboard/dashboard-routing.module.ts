import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailComponent } from './pages/users/pages/user-detail/user-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            {
                path: 'home', 
                component: HomeComponent,
            },
            {
                path: 'users', 
                children: [
                    {
                    path: '', 
                    component: UsersComponent,
                },
                {
                    path: ':id', 
                    component: UserDetailComponent,
                },
                ]
            },
            {
                path: 'courses',
                component: CoursesComponent,
            },
            {
                path: 'student',
                component: StudentComponent,
            },
            {
                path: '**', 
                redirectTo:'home',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }