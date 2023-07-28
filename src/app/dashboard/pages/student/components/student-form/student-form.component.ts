import { Component, Inject } from '@angular/core';
import { Student } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  minDate = new Date(1900, 0, 1); 
  maxDate = new Date(2030, 0, 1);

  
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
    Validators.minLength(6)
  ]);
  registrationControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(6)
  ]);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    identity: this.identityControl,
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
      this.registrationControl.setValue(this.data.registration);
    }
  }

  // GUARDAR
  onSubmit(): void {
    // alert(JSON.stringify(this.userForm.value));

    // Si el usuario no rellena los campos que no se pueda guardar
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.studentForm.value)
    }
  }
}



