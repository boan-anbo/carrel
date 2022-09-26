import './Page.css'
import React from 'react';

function Page({children} : {children?: React.ReactNode}) {
    return (
        <div className={'page'}>
            {children}
        </div>

    );
}

export default Page;
