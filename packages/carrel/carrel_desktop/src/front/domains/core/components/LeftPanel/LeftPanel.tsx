import React, { useMemo } from "react";
import { Panel } from "../../../../../ui/layout/components/Panel";
import { ArchiveList } from "../../../cabinet/pages/cabinet_archives/ArchiveList";
import { ArchiveFileBlock } from "../ArchiveFileBlock";
import { ProjectFileBlock } from "../ProjectFileBlock";
import { TagTree } from "../TagTree";

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
        block: <ArchiveList />,
        title: "Archive File",
      },
      {
        id: "tag-block",
        block: <TagTree />,
        title: "Tags",
      },
    ],
    [projectDirectory]
  );

  return <Panel blocks={panelItems} size={"xs"} />;
}
