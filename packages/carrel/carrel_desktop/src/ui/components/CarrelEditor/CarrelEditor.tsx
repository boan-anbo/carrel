import styles from "./CarrelEditor.module.scss";
import { CarrelEditorCore } from "./components";
import { Extension } from "@codemirror/state";
import { ViewUpdate } from "@codemirror/view";

export interface CarrelEditorProps {
  prop?: string;
  extensions: Extension[];
  onViewUpdate: (view: ViewUpdate) => void;
}

export function CarrelEditor({
  extensions,
  onViewUpdate,
  ...props
}: CarrelEditorProps) {
  const { ref } = CarrelEditorCore({ extensions: [], onViewUpdate });
  return <div ref={ref} className={styles.CarrelEditor} />;
}
