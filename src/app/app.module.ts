import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';



registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // NgRx
    StoreModule.forRoot(appReducer, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-AR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
