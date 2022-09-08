import {Interaction} from "../../../../clients/grl-client/interact_db_client";
import {Logger, LogSource} from "../../../../utils/logger";

const log = new Logger(LogSource.GetInteractionSelectionLabel);
export const getInteractionSelectionLabel = (interaction: Interaction): string => {
    if (!interaction || !interaction.id) {
        log.error('No interaction provided or no valid interaction id', 'provided interaction', interaction);
        return '';
    }

    return `${interaction.id}: ${interaction.label}`
};
