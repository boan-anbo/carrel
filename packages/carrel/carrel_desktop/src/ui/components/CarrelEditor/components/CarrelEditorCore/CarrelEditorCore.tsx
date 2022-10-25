import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { lintKeymap } from "@codemirror/lint";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { EditorState, Extension } from "@codemirror/state";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
  ViewUpdate,
} from "@codemirror/view";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { ECarrelWriterKeyMap } from "../../carrel-editor-keymap";
export interface CarrelEditorCoreProps {
  extensions: Extension[];
  initialDoc?: string;
  onViewUpdate: (view: ViewUpdate) => void;
  setDoc?: Dispatch<React.SetStateAction<string>>;
  onKeyPressed: (key: ECarrelWriterKeyMap) => void;
  onViewCreated?: (view: EditorState ) => void;
}

export function useCarrelEditorCore({
  extensions,
  initialDoc,
  onViewUpdate,
  setDoc,
  onKeyPressed,
  onViewCreated,
  ...props
}: CarrelEditorCoreProps) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const state = EditorState.create({
      doc: initialDoc,
      extensions: [
        EditorView.lineWrapping,
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        EditorView.updateListener.of(onViewUpdate),
        // markdown support
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
          {
            key: ECarrelWriterKeyMap.CTRL_S,
            preventDefault: true,
            run: (target) => {
              onKeyPressed(ECarrelWriterKeyMap.CTRL_S);
              return true;
            },
          },
        ]),
      ],
    });

    const view = new EditorView({
      state,
      parent: ref.current,
    });

    if (onViewCreated) {
      onViewCreated(state);
    }

    return () => {
      view?.destroy();
    };
  }, [ref, initialDoc]);

  return ref;
}
