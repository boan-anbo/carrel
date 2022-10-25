import React from "react";
import { Panel } from "../../../../../ui/layout/components/Panel";
import { CardBlock } from "../CardBlock";
import { InspectorBlock } from "../InspectorBlock";

import styles from "./RightPanel.module.scss";

export interface RightPanelProps {
  prop?: string;
}

export function RightPanel({ prop = "default value" }: RightPanelProps) {
  const panelItems = [
    {
      id: "card-block",
      block: <CardBlock />,
      title: "Cards",
    },
    {
      id: "inspector-block",
      block: <InspectorBlock />,
      title: "Inspector",
    },
  ];
  
  return <Panel blocks={panelItems} size={"xs"} />;
}
