import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { InscriptionWithStudentAndCourses } from '../models';
import { Student } from '../../student/models';
import { Courses } from '../../courses/models';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  data: InscriptionWithStudentAndCourses[],
  studentOptions: Student[],
  coursesOptions: Courses[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
  studentOptions: [],
  coursesOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,


  on(InscriptionActions.loadInscriptions, state => {
    return {
      ...state, 
      loading: true,
    }
  }),


  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),


  // STUDENT 
  on(InscriptionActions.loadStudentOptions, (state) => state),

  on(InscriptionActions.loadStudentOptionsSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data,
    }
  }),

  
  // COURSES
  on(InscriptionActions.loadCoursesOptions, (state) => state),

  on(InscriptionActions.loadCoursesOptionsSuccess, (state, action) => {
    return {
      ...state,
      coursesOptions: action.data,
    }
  })
);



export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});


