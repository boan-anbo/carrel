import React from "react";
import { Block } from "../../../../../ui/components/Block/Block";
import ArchiveFiles from "../../../cabinet/pages/cabinet_archives/ArchiveFiles";

import styles from "./ArchiveFileBlock.module.scss";

export interface ArchiveFileBlockProps {
  prop?: string;
}

export function ArchiveFileBlock({
  prop = "default value",
}: ArchiveFileBlockProps) {
  return (
    <Block title="Archive files">
      <ArchiveFiles />
    </Block>
  );
}
