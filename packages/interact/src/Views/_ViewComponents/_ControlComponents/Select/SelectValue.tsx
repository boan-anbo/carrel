import {Interaction, InteractionIdentity} from "../../../../BackEnd/clients/grl-client/interact_db_client";
import React from "react";
import {v4} from "uuid";
import {MultiSelectValue} from "./MultiSelectValue";

interface SelectValueLabelOpt {
    includeEntity?: boolean;
    includeId?: boolean;
}

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

    /**
     * Convert from {@link Interaction} to {@link SelectValue}
     * @param interaction
     */
    static fromInteraction(interaction: Interaction): SelectValue<Interaction> {
        return new SelectValue(
            interaction.id.toString(),
            interaction.label,
            interaction.id.toString(),
            interaction
        );
    }


    /**
     * Convert from {@link SelectValue} to {@link MultiSelectValue}
     */
    toMultiSelectValue<T>(opt?: SelectValueLabelOpt
    ): MultiSelectValue<T> {
        let label = SelectValue.getInteractionLabel(this.data as Interaction, opt);

        return {
            label: label,
            value: this.value,
            data: this.data
        } as MultiSelectValue<T>;
    }


    /**
     * Convert from {@link SelectValue} to {@link MultiSelectValue }
     * @param v
     */
    static fromMultiSelectValue<T>(v: MultiSelectValue<T>): SelectValue<T> {
        return new SelectValue<T>(
            v4(),
            v.label,
            v.value,
        );
    }

    /**
     * Convert from {@link SelectValue} to {@link string }
     */
    toValueString(): string {

        return this.value ?? '';

    }

    public static getInteractionLabel(interaction: Interaction, opt: { includeEntity?: boolean; includeId?: boolean } | undefined) {
        if (!opt) {
            opt = {
                includeEntity: true,
                includeId: true,
            };
        }
        if (!interaction || !interaction.label) {
            throw new Error('Cannot convert to MultiSelectValue, value is null');
        }
        let label: string[] = []

        if (opt.includeId) {
            label.push(interaction.id.toString());
        }

        if (opt.includeEntity) {
            label.push(this.getIdentityMarker((interaction as Interaction).identity));
        }
        label.push(interaction.label);
        return label.join(' ');
    }

    private static getIdentityMarker(identity: InteractionIdentity): string {
        switch (identity) {
            case InteractionIdentity.Act:
                return `[A]`;
            case InteractionIdentity.Category:
                return `[C]`;
            case InteractionIdentity.Entity:
                return `[E]`;
            case InteractionIdentity.Interaction:
                return `[I]`;
            case InteractionIdentity.Source:
                return `[S]`;
        }

    }
}
