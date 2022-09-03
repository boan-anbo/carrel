import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorInputComponent } from './editor-input/editor-input.component';
import { EditorEditComponent } from './editor-edit/editor-edit.component';
import {TextSelectDirective} from "../directives/text-edit-event";



@NgModule({
  declarations: [
    EditorComponent,
    EditorInputComponent,
    EditorEditComponent,
    TextSelectDirective
  ],
  imports: [
    CommonModule
  ]
})
export class EditorModule { }
