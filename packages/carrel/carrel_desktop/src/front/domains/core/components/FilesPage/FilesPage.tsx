import React from "react";
import { Block } from "../../../../../ui/components/Block/Block";

import styles from "./FilesPage.module.scss";

export interface FilesPageProps {
  prop?: string;
}

export function FilesPage({ prop = "default value" }: FilesPageProps) {
  return <Block title="Files"></Block>;
}
