import {Text, Container, useConst, Box, Flex} from "@chakra-ui/react";
import React, {useMemo} from "react";

import styles from "./Sidebar.module.scss";

export interface SidebarProps {
    prop?: string;
    side: "left" | "right" | "bottom";
}

export function Sidebar({...props}: SidebarProps) {
    const writingMode = useMemo(() => {
        switch (props.side) {
            case "left":
                return "vertical-rl";
            case "right":
                return "vertical-rl";
            case "bottom":
                return "horizontal-tb";
        }
    }, [props.side]);


    const height = useMemo(
        () => (props.side === "bottom" ? "fit-content" : "full"),
        [props.side]
    );
    const width = useMemo(
        () => (props.side === "bottom" ? "full" : "fit-content"),
        [props.side]
    );

    const px = useMemo(
        () => (props.side === "bottom" ? "4" : "0"),
        [props.side]
    );
    const py = useMemo(
        () => (props.side === "bottom" ? "0" : "4"),
        [props.side]
    );


    return (
        <Flex
            justifyContent='start'
            h={height}
            w={width}
            maxW="full"
            maxH="full"
            bg="gray.100"
            className={styles.Sidebar}
            fontSize='xs'
        >
            <Box
                bg='green'
                h='fit-content'
                w='fit-content'
                px={px}
                py={py}
                style={{
                    writingMode: writingMode,
                    transform: props.side === "left" ? "rotate(180deg)" : undefined,
                }}
            >
                {writingMode}
            </Box>
        </Flex>
    );
}
