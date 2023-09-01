import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscriptionActions } from '../store/inscription.actions';
import { Observable } from 'rxjs';
import { Student } from '../../student/models';
import { selectCoursesOptions, selectStudentOptions } from '../store/inscription.selectors';
import { Courses } from '../../courses/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {

  coursesIdControl = new FormControl(null, Validators.required);
  studentIdControl = new FormControl(null, Validators.required);

  inscriptionForm = new FormGroup({
    coursesId: this.coursesIdControl,
    studentId: this.studentIdControl,
  });

  studentOptions$: Observable<Student[]>;
  coursesOptions$: Observable<Courses[]>;

  constructor(
    private store: Store, 
    private matDialogRef: MatDialogRef<InscriptionFormComponent>
  ) 
    {
    this.studentOptions$ = this.store.select(selectStudentOptions);
    this.coursesOptions$ = this.store.select(selectCoursesOptions);
  }
  
  ngOnInit(): void{
    this.store.dispatch(InscriptionActions.loadCoursesOptions());
    this.store.dispatch(InscriptionActions.loadStudentOptions());
  }  

  onSubmit(): void {
    if(this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    }else{
      this.store.dispatch(InscriptionActions.createInscription({payload: this.inscriptionForm.getRawValue()})),
      this.matDialogRef.close();
    }
  }
}
