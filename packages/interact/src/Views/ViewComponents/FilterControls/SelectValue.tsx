import {LabeledValue} from "antd/lib/select";
import {Interaction} from "../../../clients/grl-client/interact_db_client";
import React from "react";
import {getInteractionSelectionLabel} from "./filter-utils/getInteractionLabel";
import {v4} from "uuid";

/**
 * Standford format for exchange selected values across components.
 */
export class SelectValue<T> {
    /**
     * Not the same as primary key, but only for identification for enumerators in React. Usually should come from index.
     * If not provided, will use generated uuid.
     */
    key?: string = v4();
    /**
     * What is shown in the select box
     */
    label: string = '';
    /**
     * Primary key of the data, e.g. {@link Interaction} id.
     */
    value: string | null = '';
    /**
     * Data payload
     */
    data?: T | null;


    constructor(key: string | number, label: string, value: string | null, data?: T) {
        this.key = typeof key === 'number' ? key.toString() : key;
        this.label = label;
        this.value = value;
        this.data = data;
    }

    toLabelValue<T>(): LabeledValue {
        return {
            key: this.key,
            // @ts-ignore
            label: this.data ? getInteractionSelectionLabel(this.data) : 'key',
            value: this.value ?? ''
        }
    }



    static fromInteraction(interaction: Interaction): SelectValue<Interaction> {
        return new SelectValue(
            interaction.id.toString(),
            interaction.label,
            interaction.id.toString(),
            interaction
        );
    }

    static fromLabelValue<T>(labeledValue: LabeledValue): SelectValue<T> {
        return new SelectValue(
            v4(),
            labeledValue.label as string,
            labeledValue.value.toString() ?? null,
        );
    }
}
