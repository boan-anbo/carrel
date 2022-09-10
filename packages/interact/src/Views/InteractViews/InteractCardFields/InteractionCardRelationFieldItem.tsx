import {Interaction} from "../../../clients/grl-client/interact_db_client";
import FilterInteractionMultiple from "../../ViewComponents/FilterControls/FilterInteractionMultiple";
import {FilterByEntityRelation} from "../../ViewComponents/FilterControls/FilterByEntityRelation";
import {SizeType} from "antd/lib/config-provider/SizeContext";

export function InteractionCardRelationFieldItem<T>(props: {
    relationData: T[] | undefined | null;
    interaction: Interaction,
    label: string,
    icon: JSX.Element,
    showLabel?: boolean,
    hideWhenNoValue?: boolean
    placeholder?: string,
    filterByEntityRelation?: FilterByEntityRelation
    relationCount?: number
    size?: SizeType | undefined

}) {

    const shouldShow = props.hideWhenNoValue ? props.relationData?.length && props.relationData?.length > 0 : true;

    return <div className={''}>
        {shouldShow && <div className={'flex space-x-2 justify-items-center content-center'}>
            <div className={'my-auto'}>
                {props?.relationCount > 0 ? props.relationCount : ''}
            </div>

            <div className={'m-auto w-full'}>
                <div>
                    {props.showLabel &&
                        <span>{props.label}</span>
                    }
                </div>


                <div className={'interaction-relation-field  w-full'}>
                    {props.relationData
                        ? <FilterInteractionMultiple
                            onSelect={(value) => {}}
                            size={props.size}
                            style={{width: '100%'}}
                            filterByEntityRelation={props.filterByEntityRelation}
                            label={props.label}
                            placeholder={props.placeholder}
                        />
                        : <span className={'text-gray-300 font-bold'}>No value</span>}
                </div>
            </div>


        </div>}
    </div>
}

// default props
InteractionCardRelationFieldItem.defaultProps = {
    showLabel: false,
    hideWhenNoValue: true,
    relationCount: 0
}
