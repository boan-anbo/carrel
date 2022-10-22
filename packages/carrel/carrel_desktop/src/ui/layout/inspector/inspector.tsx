import {useSelector} from "react-redux";
import {RootState} from "../../../front/store/store";
import {InspectorItem, InspectorItemType} from "../../../front/store/slices/inspector/inspector";
import {Project} from "../../../backend/carrel_server_client/carrel/common/project/v2/project_v2_pb";
import Page from "../../components/page/Page";
import {Block} from "../../components";
import {Box} from "@chakra-ui/react";

function ProjectInspector(props: {
    item: InspectorItem<Project> | null
}) {

    if (props.item === null) {
        return <div>Nothing selected</div>
    }


    return <Page>
        <Block
            title={props.item.item.name}

        >
            <div className={'flex space-x-4'}>
                <i className={'pi pi-book'}/>
                <div className={'flex justify-around w-full'}>
                    <div>
                        {props.item.item.name}
                    </div>
                    <div>
                        {props.item.item.lastUsedAt}
                    </div>
                </div>
            </div>
            {JSON.stringify(props.item.item.projectDirectory)}
        </Block>
    </Page>;
}

export function Inspector() {
    const inspector = useSelector((state: RootState) => state.inspector);

    return <Box bg='red.500'>
        <ProjectInspector item={inspector.item}/>
    </Box>;
}
