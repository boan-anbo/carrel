import {CreateInteractionFormData} from "../FormComponents/CreateInteractionFormData";

export function validateInteractionForm(formData: CreateInteractionFormData): Error[] {
    const errors: Error[] = [];
    // check label min 2 and max 25
    if (formData.label.length < 2 || formData.label.length > 25) {
        errors.push(new Error('Label must be between 2 and 25 characters'));
    }
    return errors;

}
