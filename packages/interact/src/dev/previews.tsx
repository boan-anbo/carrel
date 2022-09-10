import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import {SelectedPassageViewer} from "../ViewComponents/InteractViews/SelectedPassageViewer";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SelectedPassageViewer">
                <SelectedPassageViewer/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
