import {CreateInteractionFormData} from "./FormComponents/CreateInteractionFormData";
import {InteractDatePicker} from "../_ViewComponents/_ControlComponents/DatePicker/DatePicker";
import {parseDateForPicker} from "../../Utils/ParseDateForPicker";

interface InteractFormDatePickersProps {
    onSubmitForm: () => Promise<void>;
    formData: CreateInteractionFormData;
    onChange: (e: Date|null ) => void;
}

export function InteractFormDatePickers(props: InteractFormDatePickersProps) {
    return <>
        <InteractDatePicker

            onSubmitForm={props.onSubmitForm}
            size={"xs"}
            value={parseDateForPicker(props.formData.start)}
            onChange={props.onChange}
            allowFreeInput={true}
            label={"Start Date Time"}
            description={"The start date time of the interaction"}
            placeholder={"Start Date Time"}
        />

        <InteractDatePicker
            onSubmitForm={props.onSubmitForm}
            size={"xs"}
            value={parseDateForPicker(props.formData.end)}
            onChange={props.onChange}
            allowFreeInput={true}
            description={"The end date time of the interaction"}
            label={"End Date Time"}
            placeholder={"End Date Time"}
        />
    </>;
}
