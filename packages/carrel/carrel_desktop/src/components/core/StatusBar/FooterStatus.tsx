import React from 'react';
import {RootState} from "../../../store/store";
import {useSelector} from "react-redux";
import { BreadCrumb } from 'primereact/breadcrumb';
function FooterStatus() {
    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    const items = [
        {
            label: 'Directory',
        },
        {
            label: workingProject?.directory,
            command: () => {
                open(workingProject?.directory ?? '');
            }
        }
    ]

    return (
        <div>

            <BreadCrumb model={items} home={{icon: 'pi pi-home'}}/>
        </div>
    );
}

export default FooterStatus;
