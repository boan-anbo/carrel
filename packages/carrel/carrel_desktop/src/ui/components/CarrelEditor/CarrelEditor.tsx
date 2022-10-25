import styles from "./CarrelEditor.module.scss";
import { CarrelEditorCore } from "./components";
import { Extension } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { initial } from "lodash";
import { useState } from "react";
import { useCarrelEditorCore } from "./components/CarrelEditorCore";
import { ECarrelWriterKeyMap } from "./carrel-editor-keymap";
import { EditorState } from "@codemirror/state";

export interface CarrelEditorProps {
  prop?: string;
  extensions: Extension[];
  onViewUpdate: (view: ViewUpdate) => void;
  initialDoc?: string;
  onKeyPressed: (key: ECarrelWriterKeyMap) => void;
  onViewCreated?: (view: EditorState) => void;
}

export function CarrelEditor({
  extensions,
  onViewUpdate,
  initialDoc,
  onKeyPressed,
  onViewCreated,
  ...props
}: CarrelEditorProps) {
  const editorRef = useCarrelEditorCore({
    initialDoc,
    extensions,
    onViewUpdate,
    onKeyPressed,
    onViewCreated,
  });


  return <div ref={editorRef} className={styles.CarrelEditor} />;
}
