import React, { useMemo } from "react";
import { Panel } from "../../../../../ui/layout/components/Panel";
import { ArchiveFileBlock } from "../ArchiveFileBlock";
import { ProjectFileBlock } from "../ProjectFileBlock";
import { TagBlock } from "../TagBlock";

import styles from "./LeftPanel.module.scss";

export interface LeftPanelProps {
  prop?: string;
  projectDirectory?: string;
}

export function LeftPanel({ projectDirectory, ...props }: LeftPanelProps) {
  const panelItems = useMemo(
    () => [
      {
        id: "project-file-block",
        block: <ProjectFileBlock directory={projectDirectory} />,
        title: "Project File",
      },
      {
        id: "archive-file-block",
        block: <ArchiveFileBlock />,
        title: "Archive File",
      },
      {
        id: "tag-block",
        block: <TagBlock />,
        title: "Tags",
      },
    ],
    [projectDirectory]
  );

  return <Panel blocks={panelItems} size={"xs"} />;
}
