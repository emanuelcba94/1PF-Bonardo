import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
    },
    {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule),
    },
    {
        path: 'student',
        loadChildren: () => import('./pages/student/student.module').then((m) => m.StudentModule),
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }