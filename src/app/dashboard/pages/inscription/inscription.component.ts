import { Component, OnInit } from '@angular/core';
import { InscriptionActions } from './store/inscription.actions';
import { selectInscription } from './store/inscription.selectors';
import { Store } from '@ngrx/store';
import { Inscription, InscriptionWithStudentAndCourses } from './models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public displayedColumns =  ['id', 'student', 'courses', 'price', 'actions'];

  inscription$: Observable<InscriptionWithStudentAndCourses[]>;

  constructor(
    private store: Store,
    private matDialog: MatDialog
    ){
    this.inscription$ = this.store.select(selectInscription);
  }

  
  onAdd(): void {
    this.matDialog.open(InscriptionFormComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }
}
