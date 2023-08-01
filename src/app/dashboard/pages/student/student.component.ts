import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentService } from './student.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Student } from './models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  public student: Observable<Student[]>;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService,
    private notifier: NotifierService
  ) {
    this.studentService.loadStudent();
    this.student = this.studentService.getUsers();
  }



  // ABRIR MODAL // CREAR ALUMNO
  onCreateStudent(): void {
    this.matDialog
      // abrir modal
      .open(StudentFormComponent)
      
      .afterClosed()
      // hacer esto... guardar valor
      .subscribe({
        next: (v) => {
          if (v) {
            this.notifier.showSuccess('Se creo correctamente');

            this.studentService.createStudent({
              name: v.name,
              surname: v.surname,
              identity: v.identity,
              registration: v.registration,
            });
          }
        }
      })
  }


}
