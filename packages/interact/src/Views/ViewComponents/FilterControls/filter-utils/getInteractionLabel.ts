import {Interaction} from "../../../../clients/grl-client/interact_db_client";

export const getInteractionSelectionLabel = (interaction: Interaction) => `${interaction.id}: ${interaction.label}`;
