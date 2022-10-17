import { Container } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { TagGroup } from '../../../../../carrel_server_client/carrel/common/tag/v2/tag_v2_pb';
import { carrelApi } from '../../../../../server-api/carrel-api';
import { carrelQueries } from '../../../../../server-api/carrel-queries';
import { RootState } from '../../../../../store/store';
import { DataTree } from '../../../../ui/components/DataTree/DataTree';
import { DataTreeConfigState, EDataTreeNodeType, IDataTreeCollection } from '../../../../ui/components/DataTree/i-data-tree-node';

import styles from './TagTree.module.scss';

export interface TagTreeProps {
  propjectDirectory?: string;
}

export function TagTree({...props}: TagTreeProps) {

  const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

  const {data} = carrelQueries.ListAllTagGroups(
     props.propjectDirectory || workingProject?.directory
  )
  if (!data) {
    return null;
  }

  const items: IDataTreeCollection<TagGroup>[] = data.tagGroups.map((tagGroup) => {
    return {
        type: EDataTreeNodeType.COLLECTION,
        label: tagGroup.key,
        key: tagGroup.key,
        count: tagGroup.keyCount,        
        subCollectionIds: [],
        subItemIds: [],
        subItems: [],
        subCollections: [],
      } 
  })

  return <Container>
    <DataTree config={new DataTreeConfigState()} items={items} />
  </Container>;
}
