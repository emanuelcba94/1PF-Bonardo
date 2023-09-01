import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { Inscription, InscriptionWithStudentAndCourses, createInscriptionPayload } from '../models';
import { environment } from 'src/environments/environments';
import { StudentService } from '../../student/student.service';
import { Student } from '../../student/models';
import { Courses } from '../../courses/models';
import { Store } from '@ngrx/store';


@Injectable()
export class InscriptionEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(


      ofType(InscriptionActions.loadInscriptions),

      concatMap(() =>
        this.getInscriptionFromData().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),


          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  // STUDENT
  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadStudentOptions),

      concatMap(() =>
        this.getStudentOptions().pipe(
          map(data => InscriptionActions.loadStudentOptionsSuccess({ data })),


          catchError(error => of(InscriptionActions.loadStudentOptionsFailure({ error }))))
      )
    );
  });

  // COURSES
  loadCoursesOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadCoursesOptions),

      concatMap(() =>
        this.getCoursesOptions().pipe(
          map(data => InscriptionActions.loadCoursesOptionsSuccess({ data })),

          catchError(error => of(InscriptionActions.loadCoursesOptionsFailure({ error }))))
      )
    );
  });

  // CREATE INSCRIPTION
  createInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.createInscription),

      concatMap((action) =>
        this.createInscription(action.payload).pipe(
          map(data => InscriptionActions.createInscriptionSuccess({ data })),

          catchError(error => of(InscriptionActions.createInscriptionFailure({ error }))))
      )
    );
  });


  // CREATE INSCRIPTION SUCCESS
  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.createInscriptionSuccess),

      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });


  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private studentService: StudentService,
    private store: Store
  ) { }

  private getInscriptionFromData(): Observable<InscriptionWithStudentAndCourses[]> {
    return this.httpClient.get<InscriptionWithStudentAndCourses[]>(environment.baseApiUrl + '/inscription?_expand=courses&_expand=student')
  }

  // STUDENT
  private getStudentOptions(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/student')
  }

  // COURSES
  private getCoursesOptions(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(environment.baseApiUrl + '/courses')
  }

  // CREATE INSCRIPTION
  private createInscription(payload: createInscriptionPayload): Observable<Inscription> {
    return this.httpClient.post<Inscription>(environment.baseApiUrl + '/inscription', payload)
  }
}
