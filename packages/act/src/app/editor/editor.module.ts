import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorInputComponent } from './editor-input/editor-input.component';
import { EditorEditComponent } from './editor-edit/editor-edit.component';
import {TextSelectDirective} from "../directives/text-edit-event";
import { EditorFormComponent } from './editor-form/editor-form.component';
import { ActNewEntityComponent } from './editor-form/act-new-entity/act-new-entity.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeModule} from "../home/home.module";
import {ActDbModule} from "../act-db/act-db.module";



@NgModule({
  declarations: [
    EditorComponent,
    EditorInputComponent,
    EditorEditComponent,
    TextSelectDirective,
    EditorFormComponent,
    ActNewEntityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeModule,
    ActDbModule
  ]
})
export class EditorModule { }
