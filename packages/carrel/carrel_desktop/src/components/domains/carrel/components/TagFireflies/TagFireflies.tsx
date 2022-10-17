import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StandardQuery } from "../../../../../carrel_server_client/generic/api/query/v1/query_v1_pb";
import { carrelQueries } from "../../../../../server-api/carrel-queries";
import { RootState } from "../../../../../store/store";
import { FireflyDataTable } from "../../../firefly-keeper/views/components";

import styles from "./TagFireflies.module.scss";

export interface TagFirefliesProps {
  tagKey?: string;
  tagValue?: string;
  projectDirectory?: string;
}

export function TagFireflies({
  tagKey,
  tagValue,
  projectDirectory,
}: TagFirefliesProps) {
  const [query, setQuery] = React.useState<StandardQuery>();

  useEffect(() => {
    console.log("tags changed", tagKey, tagValue);
    loadInitialData();
  }, [tagKey, tagValue, projectDirectory]);

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
    tagKey,
    tagValue
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
