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
    this.student = this.studentService.getStudent();
  }


  // ABRIR MODAL // CREAR ALUMNO
  onCreateStudent(): void {
    this.matDialog
      .open(StudentFormComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.notifier.showSuccess('Se creo correctamente');
            // console.log(v)
            this.studentService.createStudent({
              name: v.name,
              surname: v.surname,
              identity: v.identity,
              courses: v.courses,
              registration: v.registration,
            });
          }
        }
      })
  }

  // EDITAR ALUMNO
  onEditStudent(studentToEdit: Student): void {
    this.matDialog
      .open(StudentFormComponent, {
        data: studentToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.studentService.updateStudentById(studentToEdit.id, studentUpdated);
          }
          this.notifier.showSuccess('Alumno Actualizado');
        }
      })
  };

  // ELIMINAR USUARIO
  onDeleteStudent(studentToDelete: Student): void {
    if (confirm(`¿Seguro desea eliminar a ${studentToDelete.name}?`)) {
      this.studentService.deleteStudentById(studentToDelete.id);
    }
    this.notifier.showError('Eliminado correctamente');
  }

}
