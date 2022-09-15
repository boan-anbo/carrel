import {CSSProperties, useEffect, useState} from "react";
import {DistantApiSearchResponse, IndexInfo, Passage} from "../../BackEnd/distant_api";
import {DistantDocumentView} from "./DistantDocumentItem";
import {useDispatch} from "react-redux";
import {TextInput} from "../_ViewComponents/_ControlComponents/Input/TextInput";
import {useDistantApiStore} from "../../zstore-distant";
import {ScrollArea, Button, Select} from "@mantine/core";
import {IconArrowDown} from "@tabler/icons";
import {SelectItem} from "@mantine/core/lib/Select/types";
import {useInputPassageRadioStore} from "../../zstore-explorer";
import {selectPassage} from "../../States/features/explorer-state/explorerStateSlice";

export const DistantDocumentSearchViewIndex = (props: {
    style?: CSSProperties
}) => {
    const searchApi = useDistantApiStore((state) => state.searchApi);

    const scrollApi = useDistantApiStore((state) => state.scrollApi);

    const listIndicesApi = useDistantApiStore((state) => state.listIndicesApi);

    const [currentIndex, setCurrentIndex] = useState<string | null>(null);

    const inputPassageRadio = useInputPassageRadioStore((state) => state.inputPassageRadio);


    const [availableIndices, setAvailableIndices] = useState<IndexInfo[] | null>([]);
    useEffect(() => {
        refreshDistantIndices();
        return () => {
        };
    }, []);


    const dispatch = useDispatch();

    const [documents, setDocuments] = useState<Passage[]>([]);


    async function onSearch(e: string) {

        console.log(searchApi);
        if (searchApi) {
            if (!currentIndex || !e) {
                alert('Please select an index and a query');
            }
            try {

                const {data} = await searchApi.search({
                    indices: [currentIndex ?? ''],
                    query: e ?? ''
                });
                setDocuments(data.passages);
            } catch (e) {
                console.log(e);
                setDocuments([]);
            }

        }
    }

    async function refreshDistantIndices() {
        if (listIndicesApi) {
            const {data} = await listIndicesApi.listIndices();
            setAvailableIndices(data.indices);
        }
    }

    // select


    function onSelectPassage(event: React.MouseEvent<HTMLDivElement>, result: Passage) {
        console.log(result)
        dispatch(selectPassage(result));
    }

    const Elements = documents.map((result, index) => {
        return <div key={index}
                    onMouseUp={
                        ($event) => onSelectPassage($event, result)}
        >
            <DistantDocumentView key={index} index={index} passage={result}></DistantDocumentView>
        </div>
    });

    const data = availableIndices?.filter(i => i.index.startsWith('distant')).map((i) => {
        return {
            label: i.index + " (" + i.docs_count + " docs)",
            value: i.index
        } as SelectItem
    }) ?? [];

    function onSelectIndex(value: string | null) {
        if (value) {
            setCurrentIndex(value);
        }
    }

    return (
        <div>

            <Select
                onDropdownOpen={() => refreshDistantIndices()}
                data={data}
                onChange={onSelectIndex}
            />
            <TextInput

                label={'Distant documents'}
                disabled={!currentIndex || !searchApi}
                description={`Search ${currentIndex ?? ''} passages by key words`}
                onPressEnter={onSearch}
            ></TextInput>

            <ScrollArea style={props.style}>
                {/*    Iterate over search result*/}
                {Elements}
            </ScrollArea>
            <div className={'text-center'}>
                <Button variant={'white'}>
                    <IconArrowDown/>
                    More</Button>
            </div>

        </div>
    )
}
