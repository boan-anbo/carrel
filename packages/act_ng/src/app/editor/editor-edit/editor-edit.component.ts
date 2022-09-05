import { Component, OnInit } from '@angular/core';
import {EditorStateService} from "../editor-state.service";

@Component({
  selector: 'app-editor-edit',
  templateUrl: './editor-edit.component.html',
  styleUrls: ['./editor-edit.component.scss']
})
export class EditorEditComponent implements OnInit {

  constructor(
    public editorState: EditorStateService

  ) { }

  ngOnInit(): void {
  }

}
