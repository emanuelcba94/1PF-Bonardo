import { Component, Inject } from '@angular/core';
import { Student } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Course {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  minDate = new Date(1900, 0, 1); 
  maxDate = new Date(2030, 0, 1);


  courses: Course[] = [
    {value: 'Angular-0', viewValue: 'Angular'},
    {value: 'SQL-1', viewValue: 'SQL'},
    {value: 'JavaScript-2', viewValue: 'JavaScript'},
    {value: 'HTML-3', viewValue: 'HTML'},
  ];


  editingStudent?: Student;


  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  surnameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  identityControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.minLength(8)
  ]);
  coursesControl = new FormControl<string | null>(null, [
    Validators.required,
  ]);
  registrationControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(6)
  ]);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    identity: this.identityControl,
    courses: this.coursesControl,
    registration: this.registrationControl
  })


  // GUARDAR Y EDITAR LA INFORMACION CARGADA AL FORMULARIO
  constructor(
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student,
  ) {
    if (this.data) {
      this.editingStudent = this.data;
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.identityControl.setValue(this.data.identity);
      this.coursesControl.setValue(this.data.courses);
      this.registrationControl.setValue(this.data.registration);
    }
  }

  // GUARDAR
  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.studentForm.value)
    }
  }
}



