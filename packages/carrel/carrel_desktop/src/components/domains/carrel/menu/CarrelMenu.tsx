import * as React from "react";
import {Link} from "react-router-dom";
import {CgBoard, FcManager} from "react-icons/all";
import {CarrelPageRoutes} from "../routes/carrel-page-routes";
import { Button } from "@chakra-ui/react";
import { LeftMenuItem } from "../../../core/nav/LeftMenu/components";


export function CarrelMenu() {
    return <>
        <Link to={CarrelPageRoutes.home.absolutePath}>
            <LeftMenuItem>Manager</LeftMenuItem>
        </Link>
        <Link to={CarrelPageRoutes.board.absolutePath}>
            <LeftMenuItem>Project Boards</LeftMenuItem>
        </Link>


        {/*<MenuDivider title={'Project'}/>*/}
        {/*<MenuItem icon="cog" labelElement={<Icon icon="share"/>} text="Settings..." intent="primary"/>*/}
        {/*<MenuItem icon="new-text-box" text="FUck text box"/>*/}
        {/*<MenuItem icon="new-object" text="New object"/>*/}
        {/*<MenuItem icon="new-link" text="New link"/>*/}
        {/*<MenuDivider title="Edit"/>*/}
        {/*<MenuItem icon="cut" text="Cut" label="⌘X"/>*/}
        {/*<MenuItem icon="duplicate" text="Copy" label="⌘C"/>*/}
        {/*<MenuItem icon="clipboard" text="Paste" label="⌘V" disabled={true}/>*/}
        {/*<MenuDivider title="Text"/>*/}
        {/*<MenuItem disabled={false} icon="align-left" text="Alignment">*/}
        {/*    <MenuItem icon="align-left" text="Left"/>*/}
        {/*    <MenuItem icon="align-center" text="Center"/>*/}
        {/*    <MenuItem icon="align-right" text="Right"/>*/}
        {/*    <MenuItem icon="align-justify" text="Justify"/>*/}
        {/*</MenuItem>*/}
        {/*<MenuItem icon="style" text="Style">*/}
        {/*    <MenuItem icon="bold" text="Bold"/>*/}
        {/*    <MenuItem icon="italic" text="Italic"/>*/}
        {/*    <MenuItem icon="underline" text="Underline"/>*/}
        {/*</MenuItem>*/}
        {/*<MenuItem icon="asterisk" text="Miscellaneous">*/}
        {/*    <MenuItem icon="badge" text="Badge"/>*/}
        {/*    <MenuItem icon="book" text="Long items will truncate when they reach max-width"/>*/}
        {/*    <MenuItem icon="more" text="Look in here for even more items">*/}
        {/*        <MenuItem icon="briefcase" text="Briefcase"/>*/}
        {/*        <MenuItem icon="calculator" text="Calculator"/>*/}
        {/*        <MenuItem icon="dollar" text="Dollar"/>*/}
        {/*        <MenuItem icon="dot" text="Shapes">*/}
        {/*            <MenuItem icon="full-circle" text="Full circle"/>*/}
        {/*            <MenuItem icon="heart" text="Heart"/>*/}
        {/*            <MenuItem icon="ring" text="Ring"/>*/}
        {/*            <MenuItem icon="square" text="Square"/>*/}
        {/*        </MenuItem>*/}
        {/*    </MenuItem>*/}
        {/*</MenuItem>*/}
    </>;
}
