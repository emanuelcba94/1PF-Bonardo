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

  editingStudent?: Student;

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  surnameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  emailControl = new FormControl<string | null>(null, [
    Validators.required,
  ]);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl
  })


  constructor(
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student,
  ) {
    if (this.data) {
      this.editingStudent = this.data;
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.studentForm.value)
    }
  }
}



