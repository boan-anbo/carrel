import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActDbComponent } from './act-db.component';
import { InteractionFilterInputComponent } from './interaction-filter-input/interaction-filter-input.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ActDbComponent,
    InteractionFilterInputComponent
  ],
  exports: [
    InteractionFilterInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ActDbModule { }
