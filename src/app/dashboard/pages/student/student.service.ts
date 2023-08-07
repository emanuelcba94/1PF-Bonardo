import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _student$ = new BehaviorSubject<Student[]>([]);
  private student$ = this._student$.asObservable();


  constructor(
    private notifier: NotifierService, 
    private httpClient: HttpClient) { }


  // CARGA DE ALUMNOS
  loadStudent(): void {
    // Con HTTP CLIENT:
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/student').subscribe({
      next: (response) => {
        // console.log('response', response)
        this._student$.next(response);
      },
      error: () => {
        // ERROR
        this.notifier.showErrorServer('Error al cargar los alumnos');
      },
      complete: () => {
        // SE COMPLETO EL OBSERVABLE
      },
    })
  }

  getStudent(): Observable<Student[]> {
    return this.student$;
  }

  // ALUMNO CREADO
  createStudent(payload: CreateStudentData): void {
    // Con HTTP CLIENT:
    this.httpClient.post<Student>(environment.baseApiUrl + '/student', {...payload})
    .pipe(
      mergeMap((studentCreated) => this.student$.pipe(
        take(1),
        map((arrayA) => [...arrayA, studentCreated])
      ))
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._student$.next(arrayActualizado);
      }
    })
  }

  // ALUMNO ACTUALIZADO
  updateStudentById(id: number, alumnoActualizado: UpdateStudentData): void {
    // Con HTTP CLIENT:
    this.httpClient.put(environment.baseApiUrl + '/student/' + id, alumnoActualizado).subscribe({
      next: (alumnoActualizado) => 
      this.loadStudent(),
    })
  }


  // ALUMNO ELIMINADO
  deleteStudentById(id: number): void {
    // Con HTTP CLIENT:
    this.httpClient.delete(environment.baseApiUrl + '/student/' + id).pipe(
      mergeMap(
        (responseUserDelete) => this.student$.pipe(take(1), map((arrayA) => arrayA.filter((u) => u.id !== id))
        )
      )
    ).subscribe({
      next: ((arrayActualizado) => this._student$.next(arrayActualizado)),
    })
 
    this.student$.pipe(take(1))

  }
}
