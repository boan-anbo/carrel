import {Project} from "../../../../../carrel_server_client/carrel/common/project/v2/project_v2_pb";
import {format, parseISO} from "date-fns";
import './ProjectManagerListItem.css';

export function ProjectManageListItem(props: { item: Project }) {
    return <div className={"text-xs font-bold "}>
        <div className={"flex space-x-4 py-2"}>

            <i className={"pi pi-book"}>
            </i>
            <div className={"flex justify-between w-full"}>
                <div className='px-6 text-left'>
                    {props.item.name}
                </div>
                <div>
                    {format(parseISO(props.item.lastUsedAt ?? ''), "yyyy-MM-dd HH:mm")}
                </div>
            </div>
        </div>
        <div>
            <span className='font-light'>
            {props.item.projectDirectory}
                </span>
        </div>
    </div>;
}
