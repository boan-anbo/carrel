import {Interaction, Relation, RelationTypes} from "../../BackEnd/grl-client/interact_db_client";
import {InteractionCardRelationFieldItem} from "./InteractCardFields/InteractionCardRelationFieldItem";
import {SiReason} from "react-icons/all";
import {IconCategory} from "@tabler/icons";

export function InteractCardRelationFields(props: { interaction: Interaction, onClickRelation: (relation: Relation) => void }) {
    return <div className={"space-y-4"}>
        <div className={""}>
            <InteractionCardRelationFieldItem<Relation>

                relationCount={props.interaction.categoriesCount}
                showLabel={false}
                placeholder={"Categories"}
                relationData={props.interaction.categories as Relation[]}
                interaction={props.interaction}
                icon={<IconCategory/>}
                label={"Categories"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.CategoryRelation
                }}
                onClickRelation={props.onClickRelation}/>
        </div>
        <div className={""}>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.contextsCount}
                showLabel={false}
                placeholder={"Contexts"}
                relationData={props.interaction.contexts as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"Contexts"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.ContextRelation
                }}
                onClickRelation={props.onClickRelation}
            />
        </div>

        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.subjectsCount}
                showLabel={false}
                placeholder={"Subjects"}
                relationData={props.interaction.subjects as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"Subjects"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.SubjectRelation
                }}
                onClickRelation={props.onClickRelation}
            />
        </div>

        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.firstActsCount}
                showLabel={false}
                placeholder={"First Acts"}
                relationData={props.interaction.firstActs as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"1st Actions"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.FirstActRelation
                }}
                onClickRelation={props.onClickRelation}
            />
        </div>

        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.objectsCount}
                showLabel={false}
                placeholder={"Objects"}
                relationData={props.interaction.objects as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"Objects"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.ObjectRelation
                }}
                onClickRelation={props.onClickRelation}
            />

        </div>
        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.secondActsCount}
                showLabel={false}
                placeholder={"Second Acts"}
                relationData={props.interaction.secondActs as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"2nd Actions"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.SecondActRelation
                }}
                onClickRelation={props.onClickRelation}
            />

        </div>

        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.indirectObjectsCount}
                showLabel={false}
                placeholder={"Indirect Objects"}
                relationData={props.interaction.indirectObjects as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"Indirect Objects"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.IndirectObjectRelation
                }}
                onClickRelation={props.onClickRelation}
            />
        </div>
        <div>
            {/*    Setting relation */}
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.settingsCount}
                showLabel={false}
                placeholder={"Settings"}
                relationData={props.interaction.settings as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"Settings"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.SettingRelation
                }}
                onClickRelation={props.onClickRelation}
            />

        </div>

        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.purposesCount}
                showLabel={false}
                placeholder={"Purposes"}
                relationData={props.interaction.purposes as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"Purposes"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.PurposeRelation
                }}
                onClickRelation={props.onClickRelation}
            />
        </div>


        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.referencesCount}
                showLabel={false}
                placeholder={"References"}
                relationData={props.interaction.references as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"References"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.ReferenceRelation
                }}
                onClickRelation={props.onClickRelation}
            />
        </div>

        <div>
            <InteractionCardRelationFieldItem<Relation>
                relationCount={props.interaction.parallelsCount}
                showLabel={false}
                placeholder={"Parallels"}
                relationData={props.interaction.parallels as Relation[]}
                interaction={props.interaction}
                icon={<SiReason/>}
                label={"Parallels"}
                size={"xs"}
                filterByEntityRelation={{
                    hostId: props.interaction.id,
                    relation: RelationTypes.ParallelRelation
                }}
                onClickRelation={props.onClickRelation}
            />

        </div>
    </div>;
}
