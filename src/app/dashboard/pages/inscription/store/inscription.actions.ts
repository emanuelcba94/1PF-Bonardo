import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription, InscriptionWithStudentAndCourses, createInscriptionPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../../student/models';
import { Courses } from '../../courses/models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithStudentAndCourses[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),


    'Load Student Options' : emptyProps(),
    'Load Student Options Success' : props<{data: Student[]}>(),
    'Load Student Options Failure' : props<{ error: HttpErrorResponse }>(),


    'Load Courses Options' : emptyProps(),
    'Load Courses Options Success' : props<{data: Courses[]}>(),
    'Load Courses Options Failure' : props<{ error: HttpErrorResponse }>(),


    'Create Inscription': props<{payload: createInscriptionPayload}>(),
    'Create Inscription Success': props<{data: Inscription}>(),
    'Create Inscription Failure': props<{error: HttpErrorResponse}>(),
  }
});


