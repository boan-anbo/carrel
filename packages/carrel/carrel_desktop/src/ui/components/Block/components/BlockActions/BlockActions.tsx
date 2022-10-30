import { ReactNode } from "react";


export interface BlockActionsProps {
  actionBar: ReactNode;
}

export function BlockActions({ actionBar }: BlockActionsProps) {
  return <>{actionBar}</>;
}
