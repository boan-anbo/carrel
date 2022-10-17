import React from 'react';
import { StandardQuery } from '../../../../../carrel_server_client/generic/api/query/v1/query_v1_pb';
import { carrelQueries } from '../../../../../server-api/carrel-queries';
import { FireflyDataTable } from '../../../firefly-keeper/views/components';

import styles from './TagFireflies.module.scss';

export interface TagFirefliesProps {
  tagKey: string;
  tagValue?: string;
}



export function TagFireflies({tagKey, tagValue}: TagFirefliesProps) {

  const {data} = carrelQueries

  return <FireflyDataTable projectDirectory={''} fireflies={[]} totalPages={0} onQueryChange={function (query: StandardQuery): void {
    throw new Error('Function not implemented.');
  } }/>;
}
