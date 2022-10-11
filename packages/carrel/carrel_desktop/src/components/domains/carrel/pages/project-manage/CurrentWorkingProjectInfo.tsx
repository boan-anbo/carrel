import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {PageSection} from "../../../../ui/page-section/PageSection";
import {HTMLTable} from "@blueprintjs/core";

export function CurrentWorkingProjectInfo() {

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    if (!workingProject) {
        return <>No project</>
    }

    return <div className='flex-row'>


        <PageSection sectionTitle={"Project info"}>
            <div className='text-xsj'>
                <HTMLTable>
                    <tr>
                        <td>Name</td>
                        <td>{workingProject.name}</td>
                    </tr>
                    <tr>
                        <td>Folder</td>
                        <td>{workingProject.directory}</td>
                    </tr>
                </HTMLTable>
            </div>
        </PageSection>

    </div>;
}
