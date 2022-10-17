import { useMemo } from "react";
import { SplitView } from "../../../../ui/components";
import Page from "../../../../ui/page/Page";
import { TagTree } from "../../components";

export interface ProjectBoardProps {}
export function ProjectBoard() {
  const first = useMemo(() => {
    return <TagTree  />;
  }, []);
  return (
    <Page>
      <SplitView first={first} firstMin={200} second={<>hello</>}></SplitView>
    </Page>
  );
}
