import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Panel,
  PanelBlock,
  viewStateToPanelBlock,
} from "../../../../../ui/layout/components/Panel";
import { getViewDefaultName } from "../../../../store/slices/view-state/get-view-default-name";
import { getViewById } from "../../../../store/slices/view-state/get-views-by-id";
import { ViewState } from "../../../../store/slices/view-state/view-state";
import { RootState } from "../../../../store/store";
import { ArchiveList } from "../../../cabinet/pages/cabinet_archives/ArchiveList";
import { ArchiveFileBlock } from "../ArchiveFileBlock";
import { ProjectFileBlock } from "../ProjectFileBlock";
import { CoreTagTreeBlock } from "../TagTree";

export interface LeftPanelProps {
  prop?: string;
  projectDirectory?: string;
}

export function LeftPanel({ projectDirectory, ...props }: LeftPanelProps) {
  const leftPanelContainer = useSelector(
    (state: RootState) => state.viewStates.LEFT_PANEL_CONTAINER
  );

  const panelItems = useMemo(
    () =>
      leftPanelContainer.map((viewState: ViewState<any>) =>
        viewStateToPanelBlock(viewState)
      ),
    [leftPanelContainer]
  );

  return <Panel blocks={panelItems} size={"xs"} />;
}
