import {WorkareaRoutingCenter} from "../../routing-center/WorkareRoutingCenter";

export function Workarea() {
    return <div className={'layout-workarea'}>

        <div className={'component-page-layout-container'}>

            <div className={'component-page-layout-body'}>

                <WorkareaRoutingCenter/>

            </div>
            <div className={'component-page-layout-footer'}>Component page footer</div>
        </div>
    </div>
}
