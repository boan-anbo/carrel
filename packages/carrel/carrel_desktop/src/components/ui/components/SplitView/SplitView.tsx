import {Box} from "@chakra-ui/react";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import React from 'react';

export interface SplitViewProps {
    first: React.ReactNode;
    second: React.ReactNode;
    firstMin?: number;
    firstInitial?: number;
    secondMin?: number;
    // whether dragging beyond the min size will hide the panel entirely
    firstSnap?: boolean;
    // whether dragging beyond the min size will hide the panel entirely
    secondSnap?: boolean;
    secondInitial?: number;
}

export function SplitView({
                              first,
                              second,
                              firstMin,
                              secondMin,
                              firstSnap,
                              secondSnap,
                              firstInitial,
                              secondInitial,
                              ...props
                          }: SplitViewProps) {

    return <Allotment>
        <Allotment.Pane snap={firstSnap} minSize={firstMin} preferredSize={firstInitial}>
            {/* The boxes are here to provide scrollable area*/}
            <Box h={'100%'} w={'100%'}>{first}
                {first}
            </Box>
        </Allotment.Pane>
        <Allotment.Pane
            preferredSize={secondInitial}
            snap={secondSnap}
            minSize={secondMin}>
            <Box h={'100%'} w={'100%'}>
                {second}
            </Box>
        </Allotment.Pane>
    </Allotment>
        ;
}
