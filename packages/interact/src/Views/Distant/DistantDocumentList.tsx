import {useEffect, useState} from "react";
import {DistantApiSearchResponse, Passage} from "../../BackEnd/distant_api";
import {searchDistant} from "../../BackEnd/distant-core-ops/search-distant";
import {DistantDocumentView} from "./DistantDocumentItem";
import {useDispatch} from "react-redux";
import {selectPassage} from "../../States/features/app-state/appStateSlice";
import {TextInput} from "../_ViewComponents/_ControlComponents/Input/TextInput";

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
            <TextInput  onChange={search}></TextInput>

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
