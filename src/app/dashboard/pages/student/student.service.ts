import { Injectable } from '@angular/core';
import { CreateStudentData, Student } from './models';
import { BehaviorSubject, Observable, of, take } from 'rxjs';



const STUDENT_CR: Observable<Student[]> = of([
  {
    id: 1,
    name: 'carlos',
    surname: 'sancho',
    identity: 38452699,
    registration: '07/05/1993',
  },
  {
    id: 2,
    name: 'jose',
    surname: 'perez',
    identity: 38452652,
    registration: '02/03/1997',
  },
]);


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _student$ = new BehaviorSubject<Student[]>([]);
  private student$ = this._student$.asObservable();



  constructor() { }


  loadStudent(): void {
    STUDENT_CR.subscribe({
      next: (studentsForm) => this._student$.next(studentsForm),
    });
  }


  getUsers(): Observable<Student[]> {
    return this.student$;
  }

  

  // ALUMNO CREADO
  createStudent(student: CreateStudentData): void {
    this.student$.pipe(take(1)).subscribe({
      next: (arrayA) => {
        this._student$.next([
          ...arrayA,
          { ...student, id: arrayA.length + 1 },
        ]);
      },
    });
  }


}
