import React, { useCallback, useEffect, useState } from "react";
import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
  rectangularSelection, crosshairCursor,
  lineNumbers, highlightActiveLineGutter, EditorView, ViewUpdate} from "@codemirror/view"
import {Extension, EditorState} from "@codemirror/state"
import {defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
  foldGutter, foldKeymap} from "@codemirror/language"
import {defaultKeymap, history, historyKeymap} from "@codemirror/commands"
import {searchKeymap, highlightSelectionMatches} from "@codemirror/search"
import {autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap} from "@codemirror/autocomplete"
import {lintKeymap} from "@codemirror/lint"
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
export interface CarrelEditorCoreProps {
  extensions: Extension[];
  onViewUpdate: (view: ViewUpdate) => void;
}

export function CarrelEditorCore({
  extensions,
  ...props
}: CarrelEditorCoreProps) {
  const [element, setElement] = useState<HTMLElement>()

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);



  useEffect(() => {
    if (!element) return;

    const view = new EditorView({
      state: EditorState.create({
        extensions: [lineNumbers(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          foldGutter(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          rectangularSelection(),
          crosshairCursor(),
          highlightActiveLine(),
          highlightSelectionMatches(),
          EditorView.updateListener.of(props.onViewUpdate),
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
            ...lintKeymap
          ])],
      }),
      parent: element,
    });

    return () => view?.destroy();
  }, [element]);

  return { ref };
}

