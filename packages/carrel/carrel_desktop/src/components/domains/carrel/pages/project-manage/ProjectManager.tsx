import {PageSection} from "../../../../ui/page-section/PageSection";
import {ActionItem} from "../../../../ui/action-item/ActionItem";
import {Button, HTMLTable} from "@blueprintjs/core";
import {pickDirectory} from "../../../../../fs/pick-directory";
import {useDispatch, useSelector} from "react-redux";
import {openWorkingProject} from "../../../../../store/slices/working-project-state/working-project-state";
import {ValueFIeldDisplay} from "../../../../ui/value-field-display/ValueFIeldDisplay";
import {RootState} from "../../../../../store/store";
import Page from "../../../../ui/page/Page";
import {InformationTable} from "../../../../ui/infomation-table/InformationTable";

function CurrentWorkingProjectInfo() {

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
                        <td>{workingProject.workingFolder}</td>
                    </tr>
                </HTMLTable>
            </div>
        </PageSection>

    </div>;
}

export function ProjectManager() {

    const dispatch = useDispatch();


    async function onButtonClick() {
        const workingfolder = await pickDirectory();
        console.log(workingfolder);
        dispatch(openWorkingProject(workingfolder));
    }

    return <Page>
        <PageSection sectionTitle={'Open or create new project'}>
            <ActionItem description={'Open project'} actions={
                <Button onClick={onButtonClick}>Open working folder</Button>
            }/>
        </PageSection>

        <CurrentWorkingProjectInfo/>

    </Page>;
}
