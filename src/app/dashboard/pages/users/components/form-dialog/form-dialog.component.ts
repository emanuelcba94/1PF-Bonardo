import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../core/models';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {

  editingUser?: User;

  nameControl = new FormControl<string | null>(null, [
    Validators.required, 
    Validators.minLength(3)
  ]);
  surnameControl = new FormControl<string | null>(null, [
    Validators.required, 
    Validators.minLength(3)
  ]);
  emailControl = new FormControl<string | null>(null, [
    Validators.required
  ]);
  passwordControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(6)
  ]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl
  })


  // GUARDAR Y EDITAR LA INFORMACION CARGADA AL FORMULARIO
  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User, 
    ) {
      if(this.data) {
        this.editingUser = this.data;
        this.nameControl.setValue(this.data.name);
        this.surnameControl.setValue(this.data.surname);
        this.emailControl.setValue(this.data.email);
        this.passwordControl.setValue(this.data.password);
      }
    }

  // GUARDAR
  onSubmit(): void {
    // alert(JSON.stringify(this.userForm.value));

    // Si el usuario no rellena los campos que no se pueda guardar
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.userForm.value)
    }
  }
}
