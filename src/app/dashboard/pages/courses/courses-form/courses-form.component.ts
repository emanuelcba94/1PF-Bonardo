import { Component, Inject } from '@angular/core';
import { Courses } from '../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


interface Dedication {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.css']
})
export class CoursesFormComponent {

  editingCourses?: Courses;

  
  dedication: Dedication[] = [
    {value: 'Bajo-0', viewValue: 'Bajo'},
    {value: 'Moderado-1', viewValue: 'Moderado'},
    {value: 'Alto-2', viewValue: 'Alto'},
  ];

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  descriptionControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(20)
  ]);
  priceControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  dedicationControl = new FormControl<string | null>(null, [
    Validators.required,
  ]);

  coursesForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    price: this.priceControl,
    dedication: this.dedicationControl
  })
 

  // GUARDAR Y EDITAR LA INFORMACION CARGADA AL FORMULARIO
  constructor(
    private dialogRef: MatDialogRef<CoursesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Courses,
  ) {
    if (this.data) {
      this.editingCourses = this.data;
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);
      this.priceControl.setValue(this.data.price);
      this.dedicationControl.setValue(this.data.dedication);
  
    }
  }

  // GUARDAR
  onSubmit(): void {
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.coursesForm.value)
    }
  }
}


