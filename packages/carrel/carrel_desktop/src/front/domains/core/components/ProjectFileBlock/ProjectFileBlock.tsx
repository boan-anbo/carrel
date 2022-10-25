import { useDispatch, useSelector } from "react-redux";
import { File } from "../../../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb";
import { DirectoryTree } from "../../../../../ui/components/DirectoryTree";
import { RootState } from "../../../../store/store";

import { setProjectFilesSelected } from "../../../../store/slices/appstate/appstate";

export interface ProjectFileBlockProps {
  directory?: string;
}

export function ProjectFileBlock({
  directory,
  ...props
}: ProjectFileBlockProps) {
  const workingProject = useSelector(
    (state: RootState) => state.workingProject
  );

  const dispatch = useDispatch();

  const onFilesSelected = (files: File[]) => {
    dispatch(setProjectFilesSelected(files));
  };

  return (
    <DirectoryTree
      root_directory={directory ?? workingProject?.workingProject?.directory}
      onFilesSelected={onFilesSelected}
    />
  );
}
