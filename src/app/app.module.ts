import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';


// import { CoursesModule } from './dashboard/pages/courses/courses.module';
// import { StudentModule } from './dashboard/pages/student/student.module';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { LoginModule } from './authentication/login/login.module';

registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule

    // CoursesModule,
    // StudentModule,
    // DashboardModule,
    // LoginModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-AR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
