import {Component, OnInit} from '@angular/core';
import {LoremIpsum, loremIpsum} from "lorem-ipsum";
// Import the application components and services.
import { TextSelectEvent } from "src/app/directives/text-edit-event";
import {EditorStateService} from "../editor-state.service";
interface SelectionRectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}


@Component({
  selector: 'app-editor-input',
  templateUrl: './editor-input.component.html',
  styleUrls: ['./editor-input.component.scss']
})
export class EditorInputComponent implements OnInit {
  sampleText: string = new LoremIpsum().generateParagraphs(2);


  ngOnInit(): void {
  }

  public hostRectangle: SelectionRectangle | null;

  private selectedText: string;

  // I initialize the app-component.
  constructor(private editorState: EditorStateService) {

    this.hostRectangle = null;
    this.selectedText = "";

  }

  // ---
  // PUBLIC METHODS.
  // ---

  // I render the rectangles emitted by the [textSelect] directive.
  public renderRectangles(event: TextSelectEvent): void {

    console.group("Text Select Event");
    console.log("Text:", event.text);
    console.log("Viewport Rectangle:", event.viewportRectangle);
    console.log("Host Rectangle:", event.hostRectangle);
    console.groupEnd();

    // If a new selection has been created, the viewport and host rectangles will
    // exist. Or, if a selection is being removed, the rectangles will be null.
    if (event.hostRectangle) {

      this.hostRectangle = event.hostRectangle;
      this.selectedText = event.text;

    } else {

      this.hostRectangle = null;
      this.selectedText = "";

    }

    this.editorState.editorSelection.next(event);
  }


  // I share the selected text with friends :)
  public shareSelection(): void {

    console.group("Shared Text");
    console.log(this.selectedText);
    console.groupEnd();

    // Now that we've shared the text, let's clear the current selection.
    document.getSelection()?.removeAllRanges();
    // CAUTION: In modern browsers, the above call triggers a "selectionchange"
    // event, which implicitly calls our renderRectangles() callback. However,
    // in IE, the above call doesn't appear to trigger the "selectionchange"
    // event. As such, we need to remove the host rectangle explicitly.
    this.hostRectangle = null;
    this.selectedText = "";

  }



}

