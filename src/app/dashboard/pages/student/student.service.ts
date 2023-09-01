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
  public student$ = this._student$.asObservable();


  constructor(
    private notifier: NotifierService, 
    private httpClient: HttpClient) { }


  loadStudent(): void {
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/student').subscribe({
      next: (response) => {
        this._student$.next(response);
      },
      error: () => {
        this.notifier.showErrorServer('Error al cargar los alumnos');
      },
      complete: () => {},
    })
  }

  getStudent(): Observable<Student[]> {
    return this.student$;
  }

  createStudent(payload: CreateStudentData): void {
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

  updateStudentById(id: number, alumnoActualizado: UpdateStudentData): void {
    this.httpClient.put(environment.baseApiUrl + '/student/' + id, alumnoActualizado).subscribe({
      next: (alumnoActualizado) => 
      this.loadStudent(),
    })
  }

  deleteStudentById(id: number): void {
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
