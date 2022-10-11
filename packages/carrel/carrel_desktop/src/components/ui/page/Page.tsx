import './Page.css'
import React from 'react';
import {ScrollPanel} from "primereact";

function Page({children} : {children?: React.ReactNode}) {
    return (
        <div className={'page'}>
            <ScrollPanel style={{ width: '100%', height: '100%' }}>
            {children}
            </ScrollPanel>
        </div>

    );
}

export default Page;
