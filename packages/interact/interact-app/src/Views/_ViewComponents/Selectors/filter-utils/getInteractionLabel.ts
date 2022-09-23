import {Interaction, InteractionIdentity} from "../../../../BackEnd/grl-client/interact_db_client";
import {Logger, LogSource} from "../../../../Services/logger";

const log = new Logger(LogSource.GetInteractionSelectionLabel);
export const getInteractionSelectionLabel = (interaction: Interaction): string => {
    if (!interaction || !interaction.id) {
        log.error('No interaction provided or no valid interaction id', 'provided interaction', interaction);
        return '';
    }

    return `${getEntityName(interaction?.identity)} ${interaction.id}: ${interaction.label}`
};

const getEntityName = (identity: InteractionIdentity): string => {
    try {

        switch (identity) {
            case InteractionIdentity.Act:
                return '[A]';
            case InteractionIdentity.Entity:
                return '[E]';
            case InteractionIdentity.Interaction:
                return '[I]';
            case InteractionIdentity.Source:
                return '[S]';
        }
    } catch (e) {

    }
    return '';
}
