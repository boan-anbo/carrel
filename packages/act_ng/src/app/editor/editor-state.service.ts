import { Injectable } from '@angular/core';
import {TextSelectEvent} from "../directives/text-edit-event";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorStateService {

  editorSelection : Subject<TextSelectEvent | null> = new Subject<TextSelectEvent | null>();
  constructor() { }
}
