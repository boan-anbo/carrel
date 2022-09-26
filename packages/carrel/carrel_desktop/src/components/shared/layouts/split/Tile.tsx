import React from 'react';
import './Tile.css';
import {IconButton} from "../../buttons/IconButton";
import {CgClose} from "react-icons/all";


function Tile(props: {
    tileId: string,
    onTileClose: (tileId: string) => void,
}) {
    return (<>
            <div className="tile-header">
                <IconButton icon={<CgClose/>} onClick={() => props.onTileClose(props.tileId)}/>
            </div>
            <div className="tile">
                {props.tileId}
            </div>
        </>
    );
}

export default Tile;
