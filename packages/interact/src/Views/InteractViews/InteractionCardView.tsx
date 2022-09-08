import FilterInteractionSingle from "../ViewComponents/FilterControls/FilterInteractionSingle";
import {useEffect, useState} from "react";
import {
    ContextRelation,
    FirstActRelation,
    Interaction,
    RelationTypes,
    SubjectRelation,
    ObjectRelation,
    SecondActRelation,
    IndirectObjectRelation,
    PurposeRelation,
    SettingRelation,
    ParallelRelation,
    ReferenceRelation,

} from "../../clients/grl-client/interact_db_client";
import {getFullInteractionById} from "../../clients/interact-db-client/filter-operations";
import {InteractionCardFieldItem} from "./InteractCardFields/InteractionCardFieldItem";
import {BiData, BiLabel, MdDescription, MdPermIdentity, SiContentful, SiReason} from "react-icons/all";
import {InteractionCardRelationFieldItem} from "./InteractCardFields/InteractionCardRelationFieldItem";

interface InteractionCardViewProps {
    interaction?: Interaction
}

export function InteractionCardView(props: InteractionCardViewProps) {

    const [interaction, setInteraction] = useState<Interaction | null>(null);

    useEffect(() => {

        if (props.interaction) {
            setInteraction(props.interaction);
        }
    }, [props.interaction?.id]);


    return <div className={'px-4'} onMouseDown={e => e.stopPropagation()}>

        <FilterInteractionSingle

            placeholder={'Search interaction'}
            style={{width: '100%'}}
            onSelect={async (e) => {
                const result = await getFullInteractionById(parseInt(e.value));
                setInteraction(result);
            }}
        />
        {interaction &&
            <div>
                <div className={"space-x-0"}>
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
                        <InteractionCardRelationFieldItem<ContextRelation>
                            relationCount={interaction.contextsCount}
                            showLabel={false}
                            placeholder={'Contexts'}
                            relationData={interaction.contexts as ContextRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ContextRelation
                            }}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<SubjectRelation>
                            relationCount={interaction.subjectsCount}
                            showLabel={false}
                            placeholder={'Subjects'}
                            relationData={interaction.subjects as SubjectRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.SubjectRelation
                            }}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<FirstActRelation>
                            relationCount={interaction.firstActsCount}
                            showLabel={false}
                            placeholder={'First Acts'}
                            relationData={interaction.firstActs as FirstActRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.FirstActRelation
                            }}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<ObjectRelation>
                            relationCount={interaction.objectsCount}
                            showLabel={false}
                            placeholder={'Objects'}
                            relationData={interaction.objects as ObjectRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ObjectRelation
                            }}
                        />

                    </div>
                    <div>
                        <InteractionCardRelationFieldItem<SecondActRelation>
                            relationCount={interaction.secondActsCount}
                            showLabel={false}
                            placeholder={'Second Acts'}
                            relationData={interaction.secondActs as SecondActRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.SecondActRelation
                            }}
                        />

                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<IndirectObjectRelation>
                            relationCount={interaction.indirectObjectsCount}
                            showLabel={false}
                            placeholder={'Indirect Objects'}
                            relationData={interaction.indirectObjects as IndirectObjectRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.IndirectObjectRelation
                            }}
                        />
                    </div>
                    <div>
                        {/*    Setting relation */}
                        <InteractionCardRelationFieldItem<SettingRelation>
                            relationCount={interaction.settingsCount}
                            showLabel={false}
                            placeholder={'Settings'}
                            relationData={interaction.settings as SettingRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.SettingRelation
                            }}
                        />

                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<PurposeRelation>
                            relationCount={interaction.purposesCount}
                            showLabel={false}
                            placeholder={'Purposes'}
                            relationData={interaction.purposes as PurposeRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.PurposeRelation
                            }}
                        />
                    </div>


                    <div>
                        <InteractionCardRelationFieldItem<ReferenceRelation>
                            relationCount={interaction.referencesCount}
                            showLabel={false}
                            placeholder={'References'}
                            relationData={interaction.references as ReferenceRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ReferenceRelation
                            }}
                        />
                    </div>

                    <div>
                        <InteractionCardRelationFieldItem<ParallelRelation>
                            relationCount={interaction.parallelsCount}
                            showLabel={false}
                            placeholder={'Parallels'}
                            relationData={interaction.parallels as ParallelRelation[]}
                            interaction={interaction}
                            icon={<SiReason/>}
                            label={''}
                            size={'small'}
                            filterByEntityRelation={{
                                hostId: interaction.id,
                                relation: RelationTypes.ParallelRelation
                            }}
                        />

                    </div>

                </div>
            </div>
        }
    </div>
        ;
}
