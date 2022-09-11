import FilterInteractionSingle from "../_ViewComponents/Selectors/FilterInteractionSingle";
import {useEffect, useState} from "react";
import {Interaction, Relation, RelationTypes,} from "../../BackEnd/grl-client/interact_db_client";
import {getFullInteractionById} from "../../BackEnd/interact-db-client/filter-operations";
import {InteractionCardFieldItem} from "./InteractCardFields/InteractionCardFieldItem";
import {BiData, BiLabel, MdDescription, MdPermIdentity, SiContentful, SiReason} from "react-icons/all";
import {InteractionCardRelationFieldItem} from "./InteractCardFields/InteractionCardRelationFieldItem";
import {notify} from "../../Services/toast/notify";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../States/features/app-state/appStateSlice";
import {Logger, LogSource} from "../../Services/logger";

interface InteractionCardViewProps {
    interaction?: Interaction
}

const log = new Logger(LogSource.InteractionCardView)
export function InteractionCardView(props: InteractionCardViewProps) {


    const [interaction, setInteraction] = useState<Interaction | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {

        if (props.interaction) {
            setInteraction(props.interaction);
        }
    }, [props.interaction?.id]);


    function onInteractionCardRelationFieldItemClickRelation(relation: Relation) {
        log.info('onInteractionCardRelationFieldItemClickRelation', 'relation', relation)
        dispatch(
            selectInteraction(relation.linkedInteraction as Interaction)
        )
    }

    return <div className={'px-4'} onMouseDown={e => e.stopPropagation()}>

        <FilterInteractionSingle

            placeholder={'Search interaction'}
            style={{width: '100%'}}
            onSingleSelectionChange={async (e) => {
                if (e.value) {
                    const interaction = await getFullInteractionById(parseInt(e.value as string));
                    setInteraction(interaction);
                } else {
                    notify('No interaction found', 'check server', 'error');
                }

            }}
        />
        {interaction &&
            <div>
                <div className={"space-x-0 space-y-2"}>
                    <div>
                        <InteractionCardFieldItem
                            label={'Label'}
                            icon={<BiLabel/>}
                            interaction={interaction}
                            fieldValue={interaction.label}/>
                    </div>
                    <div>
                        <InteractionCardFieldItem
                            label={'Description'}
                            icon={<MdDescription/>}
                            interaction={interaction}
                            fieldValue={interaction.description}/>
                    </div>
                    <div>
                        <InteractionCardFieldItem
                            label={'Content'}
                            icon={<SiContentful/>}
                            interaction={interaction}
                            fieldValue={interaction.content}/>
                    </div>
                    <div>
                        <InteractionCardFieldItem
                            label={'Identity'}
                            icon={<MdPermIdentity/>}
                            interaction={interaction}
                            fieldValue={interaction.identity}/>
                    </div>
                    <div>
                        <InteractionCardFieldItem
                            label={'Data'}
                            icon={<BiData/>}
                            interaction={interaction}
                            fieldValue={interaction.data}/>
                    </div>

                    <div className={''}>
                        <InteractionCardRelationFieldItem<Relation>

                            relationCount={interaction.categoriesCount}
                            showLabel={false}
                            placeholder={'Categories'}
                            relationData={interaction.categories as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'Categories'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ContextRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}/>
                    </div>
                    <div className={''}>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.contextsCount}
                            showLabel={false}
                            placeholder={'Contexts'}
                            relationData={interaction.contexts as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ContextRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.subjectsCount}
                            showLabel={false}
                            placeholder={'Subjects'}
                            relationData={interaction.subjects as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'Subjects'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.SubjectRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.firstActsCount}
                            showLabel={false}
                            placeholder={'First Acts'}
                            relationData={interaction.firstActs as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'1st Actions'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.FirstActRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.objectsCount}
                            showLabel={false}
                            placeholder={'Objects'}
                            relationData={interaction.objects as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={"Objects"}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ObjectRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />

                    </div>
                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.secondActsCount}
                            showLabel={false}
                            placeholder={'Second Acts'}
                            relationData={interaction.secondActs as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'2nd Actions'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.SecondActRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />

                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.indirectObjectsCount}
                            showLabel={false}
                            placeholder={'Indirect Objects'}
                            relationData={interaction.indirectObjects as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'Indirect Objects'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.IndirectObjectRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />
                    </div>
                    <div>
                        {/*    Setting relation */}
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.settingsCount}
                            showLabel={false}
                            placeholder={'Settings'}
                            relationData={interaction.settings as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'Settings'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.SettingRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />

                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.purposesCount}
                            showLabel={false}
                            placeholder={'Purposes'}
                            relationData={interaction.purposes as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'Purposes'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.PurposeRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />
                    </div>


                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.referencesCount}
                            showLabel={false}
                            placeholder={'References'}
                            relationData={interaction.references as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'References'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ReferenceRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<Relation>
                            relationCount={interaction.parallelsCount}
                            showLabel={false}
                            placeholder={'Parallels'}
                            relationData={interaction.parallels as Relation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={'Parallels'}
                            size={'xs'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ParallelRelation
                            }}
                            onClickRelation={onInteractionCardRelationFieldItemClickRelation}
                        />

                    </div>

                </div>
            </div>
        }
    </div>
        ;
}
