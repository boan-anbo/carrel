import { useMemo } from 'react';
import { Project } from '../../../../../carrel_server_client/carrel/common/project/v2/project_v2_pb';
import { TCarrelJustify } from '../../../../props/i-justify';
import { ItemInfo } from '../../../../ui/components';
import { ItemInfoEntry } from '../../../../ui/components/ItemInfo/ItemInfo';

import styles from './ProjectInfo.module.scss';

export interface ProjectInfoProps {
  project?: Project | null;
  title: string;
  headerPosition?: TCarrelJustify;
}

export function ProjectInfoDisplay({project, title, headerPosition}: ProjectInfoProps) {


  const itemInfoEntries = useMemo(() => {
    return (
      ([
        {
          label: "Name",
          value: project?.name,
        },
      ] as ItemInfoEntry[]) ?? []
    );
  }, [project]);

  return <ItemInfo namePosition={headerPosition} name={title} entries={itemInfoEntries} />;
}
