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
  public courses$ = this._courses$.asObservable();

  constructor(
    private notifier: NotifierService, 
    private httpClient: HttpClient) { }


  loadCourses(): void {
    this.httpClient.get<Courses[]>(environment.baseApiUrl + '/courses').subscribe({
      next: (response) => {
        this._courses$.next(response);
      },
      error: () => {
        this.notifier.showErrorServer('Error al cargar los cursos');
      },
      complete: () => {},
    })
  }

  getCourses(): Observable<Courses[]> {
    return this.courses$;
  }

  createCourses(payload: CreateCoursesData): void {
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

  updateCourseById(id: number, cursoActualizado: UpdateCoursesData): void {
    this.httpClient.put(environment.baseApiUrl + '/courses/' + id, cursoActualizado).subscribe({
      next: (cursoActualizado) => 
      this.loadCourses(),
    })
  }

  deleteCourseById(id: number): void {
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
