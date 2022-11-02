import { CarrelWriter } from "../../../domains/core/components/CarrelWriter/CarrelWriter";
import { ViewId } from "./view-id";
import { ArchiveList } from "../../../domains/cabinet/pages/cabinet_archives/ArchiveList";
import { TagFireflies } from "../../../domains/core/components/TagFireflies";
import { InspectorBlock } from "../../../domains/core/components/InspectorBlock";
import ArchiveFiles from "../../../domains/cabinet/pages/cabinet_archives/ArchiveFiles";
import { ArchiveFileBlock } from "../../../domains/core/components/ArchiveFileBlock";
import { CardBlock } from "../../../domains/core/components/CardBlock";
import { ProjectFileBlock } from "../../../domains/core/components/ProjectFileBlock/ProjectFileBlock";
import { TagTree } from "../../../domains/carrel/components";

export const getViewById = (viewId: ViewId) => {
  switch (viewId) {
    case ViewId.ARCHIVE_LIST:
      return <ArchiveList />;
    case ViewId.CARD_BLOCK:
      return <CardBlock />;
    case ViewId.INSPECTOR_BLOCK:
      return <InspectorBlock />;
    case ViewId.ARCHIVE_FILES:
      return <ArchiveFileBlock />;
    case ViewId.CARREL_WRITER:
      return <CarrelWriter />;
    case ViewId.PROJECT_FILE:
      return <ProjectFileBlock />;
    case ViewId.CORE_TAG_TREE:
      return <TagTree />;
    case ViewId.EMPTY:
      return <>Empty page</>;
    default:
      return <div>View not found</div>;
  }
};
