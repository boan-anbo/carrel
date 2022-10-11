import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {InspectorItem, InspectorItemType} from "../../../store/slices/inspector/inspector";
import {Card} from "primereact";
import {Project} from "../../../carrel_server_client/carrel/common/project/v2/project_v2_pb";

function ProjectInspector(props: {
    item: InspectorItem<Project> | null
}) {

    if (props.item === null) {
        return <div>Nothing selected</div>
    }


    return <div>
        <Card
            title={props.item.item.name}
            header={
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

            }
        >
            {JSON.stringify(props.item.item.projectDirectory)}
        </Card>
    </div>;
}

export function Inspector() {
    const inspector = useSelector((state: RootState) => state.inspector);

    return <>
        <ProjectInspector item={inspector.item}/>


    </>;
}
