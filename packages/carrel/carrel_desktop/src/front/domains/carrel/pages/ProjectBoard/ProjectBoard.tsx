import { useMemo, useState } from "react";
import { TagGroup } from "../../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb";
import { Block, SplitView } from "../../../../../ui/components";
import { IDataTreeNode } from "../../../../../ui/components/DataTree/i-data-tree-node";
import Page from "../../../../../ui/components/page/Page";
import { TagFireflies, TagTree } from "../../components";

export interface ProjectBoardProps {
  projectDirectory?: string;
}
export function ProjectBoard({ projectDirectory }: ProjectBoardProps) {
  const [selectedTagKey, setSelectedTagKey] = useState<string>();
  const [selectedTagValue, setSelectedTagValue] = useState<string>();

  const onSelectionsChange = (items: IDataTreeNode<TagGroup>[]) => {
    console.log("onSelectionsChange", items);
    if (items.length > 0) {
      let tagGroup = items[0].data as TagGroup;
      setSelectedTagKey(tagGroup.key);
      setSelectedTagValue(tagGroup.value);
    }
  };


  const tagTree = useMemo(() => {
    return (
        <TagTree
          onSelectionsChange={onSelectionsChange}
          propjectDirectory={projectDirectory}
        />
    );
  }, []);

  const tagFireflies = useMemo(() => {
    return (
      <TagFireflies
        projectDirectory={projectDirectory}
        tagKey={selectedTagKey}
        tagValue={selectedTagValue}
      />
    );
  }, [projectDirectory, selectedTagKey, selectedTagValue]);
  return (
    <Page>
      <SplitView
        first={tagTree}
        firstMin={300}
        firstInitial={30}
        second={tagFireflies}
      ></SplitView>
    </Page>
  );
}
