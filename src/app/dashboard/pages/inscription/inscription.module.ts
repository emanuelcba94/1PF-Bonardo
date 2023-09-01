import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionComponent } from './inscription.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionFeature } from './store/inscription.reducer';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';


@NgModule({
  declarations: [
    InscriptionComponent,
    InscriptionFormComponent
  ],
  imports: [
    CommonModule,
    InscriptionRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects])
  ]
})
export class InscriptionModule { }
