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
  roleControl = new FormControl<string | null>(null, [
    Validators.required,
  ]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    role: this.roleControl
  })


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
        this.roleControl.setValue(this.data.role);
      }
    }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      const payload: any = {
        ...this.userForm.value
      }
      if(this.editingUser){
        payload['token'] = this.editingUser.token;
      }
      this.dialogRef.close(payload);
    }
  }
}
