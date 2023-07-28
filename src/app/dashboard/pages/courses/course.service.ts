import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Courses } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses$ = new BehaviorSubject<Courses[]>([]);


  constructor() { }

  // CARGAR CURSOS
  loadCourses(): void {
    this.courses$.next([
      {
        id: 1,
        name: 'Angular',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        price: 30.000,
        dedication: 'Moderada'
      },
      {
        id: 2,
        name: 'SQL',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        price: 40.000,
        dedication: 'Moderada'
      },
      {
        id: 3,
        name: 'JavaScript',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        price: 35.000,
        dedication: 'Alta'
      }

    ])
  }

  // OBTENER CURSOS
  getCourses(): Observable<Courses[]> {
    return this.courses$.asObservable();
  }

  // CREAR/PUSH DATOS AL ARRAY
  create(): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            name: 'Bootstrap',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
            price: 25.000,
            dedication: 'Moderada'
          }
        ]);
      }
    })
  }

  // METODO ELIMINAR CURSO
  deleteById(id: number): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next(
          arrayActual.filter((c) => c.id !== id)
        );
      }
    })
  }
}
