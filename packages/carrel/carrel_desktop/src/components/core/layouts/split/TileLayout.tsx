import {useMemo, useState} from 'react'
import Splitter, {SplitDirection} from '@devbookhq/splitter';
import Tile from './Tile';
import {newUuid} from "../../../../utils/new-uuid";
import {Button} from "@blueprintjs/core";
import {CgAdd} from "react-icons/all";
import {IconButton} from "../../buttons/IconButton";

function TileLayout() {

    const [direction, setDirection] = useState<SplitDirection>(SplitDirection.Horizontal);
    const [childrenTileIds, setChildrenTileIds] = useState<string[]>([newUuid()]);


    const hasChildren = useMemo(() => childrenTileIds.length > 0, [childrenTileIds]);
    const childrenNumber = useMemo(() => childrenTileIds.length, [childrenTileIds]);


    const getIntialSize: number[] = useMemo(() => {
            const average = 100 / childrenNumber;
            return Array(childrenNumber).fill(average);
        }
        , [childrenNumber]);

    const onTileClose = (tileId: string) => {
        setChildrenTileIds(childrenTileIds.filter((id) => id !== tileId) ?? []);
    };
    const tiles = childrenTileIds.map((tileId, index) => {
        return <Tile key={index} tileId={tileId} onTileClose={onTileClose}></Tile>
    });

    function addWindow() {
        setChildrenTileIds([...childrenTileIds, newUuid()]);
    }

    return (
        <div className={'flex-row w-full'}>
            <IconButton icon={<CgAdd/>} onClick={addWindow}/>
            {hasChildren &&
                <Splitter
                    initialSizes={getIntialSize}
                    direction={direction}
                >
                    {tiles}
                </Splitter>
            }
        </div>);

}

export default TileLayout;
