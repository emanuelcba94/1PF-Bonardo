import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  constructor(
    private matDialog: MatDialog,
  ) {}



  // ABRIR MODAL // CREAR ALUMNO
  onCreateStudent(): void {
    this.matDialog
      // abrir modal
      .open(StudentFormComponent)
  }
}
