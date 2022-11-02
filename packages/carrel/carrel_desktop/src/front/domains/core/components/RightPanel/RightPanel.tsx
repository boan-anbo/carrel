import React, { useMemo } from "react";
import {
  Panel,
  viewStateToPanelBlock,
} from "../../../../../ui/layout/components/Panel";
import { ViewId } from "../../../../store/slices/view-state/view-id";
import { CardBlock } from "../CardBlock";
import { InspectorBlock } from "../InspectorBlock";

import styles from "./RightPanel.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getViewById } from "../../../../store/slices/view-state/get-views-by-id";
import { ViewState } from "../../../../store/slices/view-state/view-state";
import { getViewDefaultName } from "../../../../store/slices/view-state/get-view-default-name";

export interface RightPanelProps {
  prop?: string;
}

export function RightPanel({ prop = "default value" }: RightPanelProps) {
  const rightPanelContainer = useSelector(
    (state: RootState) => state.viewStates.RIGHT_PANEL_CONTAINER
  );

  const panelItems = useMemo(
    () =>
      rightPanelContainer.map((viewState: ViewState<any>) => {
        return viewStateToPanelBlock(viewState);
      }),
    [rightPanelContainer]
  );
  return <Panel blocks={panelItems} size={"xs"} />;
}
