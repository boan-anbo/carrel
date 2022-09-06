import {MouseEvent, useEffect, useState} from "react";
import {DistantApiSearchResponse, Passage} from "../../clients/distant_api";
import {searchDistant} from "../../clients/distant-core-ops/search-distant";
import {SearchSimple} from "../../ControlComponents/SearchSimple";
import {DistantDocumentView} from "../ViewComponents/Distant/DistantDocumentItem";
import {useDispatch} from "react-redux";
import {selectPassage} from "../../features/app-state/appStateSlice";

export const DistantDocumentList = () => {
    const [searchResult, setSearchResult] = useState<DistantApiSearchResponse | null>(null);
    // use dispatch to set the selected passage
    const dispatch = useDispatch();

    useEffect(() => {
        search('test')
    }, [])

    const search = async (value: string) => {
        const result = await searchDistant(value);
        setSearchResult(result)
    }

    function onSelectPassage(event: React.MouseEvent<HTMLDivElement>, result: Passage) {
       console.log(result)
        dispatch(selectPassage(result))
    }

    return (
        <div>
            <SearchSimple onSearch={search}></SearchSimple>

            <div>
                {/*    Iterate over search result*/}
                {searchResult?.passages.map((result, index) => {
                    return <div key={index} onMouseUp={($event) => onSelectPassage($event, result)}>
                        <DistantDocumentView key={index} index={index} passage={result}></DistantDocumentView>
                    </div>
                })}
            </div>

        </div>
    )
}
