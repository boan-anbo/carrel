import {useDispatch, useSelector} from "react-redux";
import {File} from "../../../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb";
import {DirectoryTree} from "../../../../../ui/components/DirectoryTree";
import {RootState} from "../../../../store/store";

import {setProjectFilesSelected} from "../../../../store/slices/appstate/appstate";
import {Block} from "../../../../../ui/components";

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
        <Block>
            <DirectoryTree
                root_directory={directory ?? workingProject?.workingProject?.directory}
                onFilesSelected={onFilesSelected}
            />
        </Block>
    );
}
