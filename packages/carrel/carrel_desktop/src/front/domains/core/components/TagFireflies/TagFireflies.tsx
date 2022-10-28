import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TagKeyValueNote } from "../../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb";
import { StandardQuery } from "../../../../../backend/carrel_server_client/generic/api/query/v1/query_v1_pb";
import { carrelQueries } from "../../../../../backend/server-api/carrel-queries";
import { RootState } from "../../../../store/store";
import { FireflyDataTable } from "../../../firefly-keeper/views/components";

export interface TagFirefliesProps {
  projectDirectory?: string;
}

export function TagFireflies({ projectDirectory }: TagFirefliesProps) {
  const [query, setQuery] = React.useState<StandardQuery>();

  const selectedTags = useSelector(
    (state: RootState) => state.appstate.coreTagsSelected
  );

  useEffect(() => {
    loadInitialData();
  }, [selectedTags, projectDirectory]);

  const loadInitialData = () => {
    const standardQuery = new StandardQuery();
    standardQuery.length = 20;
    console.log("loading initial data");
    setQuery(standardQuery);
  };

  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );

  const { data } = carrelQueries.QueryFirefliesByTags(
    projectDirectory || workingProject?.directory,
    query,
    selectedTags?.map((t) => {
      return {
        key: t.key,
        value: t.value,
        note: t.note,
      } as TagKeyValueNote;
    })
  );

  return (
    <FireflyDataTable
      projectDirectory={projectDirectory || workingProject?.directory}
      fireflies={data?.fireflies}
      totalPages={data?.responseMetadata?.resultTotalPages}
      onQueryChange={setQuery}
    />
  );
}
