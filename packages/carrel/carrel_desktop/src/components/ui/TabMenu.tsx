import {useTab, useTabList, useTabPanel} from 'react-aria';
import {Item, useTabListState} from 'react-stately';
import {useRef} from "react";

function Tabs(props) {
    let state = useTabListState(props);
    let ref = useRef();
    let {tabListProps} = useTabList(props, state, ref);
    return (
        <div className={`tabs ${props.orientation || ''}`}>
            <div {...tabListProps} ref={ref}>
                {[...state.collection].map((item) => (
                    <Tab
                        key={item.key}
                        item={item}
                        state={state}
                        orientation={props.orientation}
                    />
                ))}
            </div>
            <TabPanel key={state.selectedItem?.key} state={state}/>
        </div>
    );
}

function Tab({item, state, orientation}) {
    let {key, rendered} = item;
    let ref = useRef();
    let {tabProps, isSelected, isDisabled} = useTab({key}, state, ref);
    return (
        <div {...tabProps} ref={ref}>
            {rendered}
        </div>
    );
}

function TabPanel({state, ...props}) {
    let ref = useRef();
    let {tabPanelProps} = useTabPanel(props, state, ref);
    return (
        <div {...tabPanelProps} ref={ref}>
            {state.selectedItem?.props.children}
        </div>
    );
}

<Tabs aria-label="History of Ancient Rome">
    <Item key="FoR" title="Founding of Rome">
        Arma virumque cano, Troiae qui primus ab oris.
    </Item>
    <Item key="MaR" title="Monarchy and Republic">
        Senatus Populusque Romanus.
    </Item>
    <Item key="Emp" title="Empire">Alea jacta est.</Item>
</Tabs>
