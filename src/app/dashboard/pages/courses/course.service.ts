import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, mergeMap, map } from 'rxjs';
import { Courses, CreateCoursesData, UpdateCoursesData } from './models';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _courses$ = new BehaviorSubject<Courses[]>([]);
  private courses$ = this._courses$.asObservable();


  constructor(
    private notifier: NotifierService, 
    private httpClient: HttpClient) { }


  // CARGAR CURSOS
  loadCourses(): void {
    // Con HTTP CLIENT:
    this.httpClient.get<Courses[]>(environment.baseApiUrl + '/courses').subscribe({
      next: (response) => {
        this._courses$.next(response);
      },
      error: () => {
        // ERROR
        this.notifier.showErrorServer('Error al cargar los cursos');
      },
      complete: () => {
        // SE COMPLETO EL OBSERVABLE
      },
    })
  }

  
  // OBTENER CURSOS
  getCourses(): Observable<Courses[]> {
    return this.courses$;
  }


  // CURSO CREADO
  createCourses(payload: CreateCoursesData): void {

    // Con HTTP CLIENT:
    this.httpClient.post<Courses>(environment.baseApiUrl + '/courses', {...payload})
    .pipe(
      mergeMap((courseCreate) => this.courses$.pipe(
        take(1),
        map((arrayA) => [...arrayA, courseCreate])
      ))
    )
    .subscribe({
      next: (arrayActual) => {
        this._courses$.next(arrayActual);
      }
    })
  }

  // CURSO ACTUALIZADO
  updateCourseById(id: number, cursoActualizado: UpdateCoursesData): void {
    // Con HTTP CLIENT:
    this.httpClient.put(environment.baseApiUrl + '/courses/' + id, cursoActualizado).subscribe({
      next: (cursoActualizado) => 
      this.loadCourses(),
    })
  }


  // CURSO ELIMINADO
  deleteCourseById(id: number): void {
    // Con HTTP CLIENT:
    this.httpClient.delete(environment.baseApiUrl + '/courses/' + id).pipe(
      mergeMap(
        (responseCourseDelete) => this.courses$.pipe(take(1), map((arrayA) => arrayA.filter((u) => u.id !== id))
        )
      )
    ).subscribe({
      next: ((arrayActual) => this._courses$.next(arrayActual)),
    })
    
    this.courses$.pipe(take(1))

  }

}
