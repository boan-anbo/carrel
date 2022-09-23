import {FormMode} from "./EFormMode";
import {Box, Center, SegmentedControl} from "@mantine/core";
import {IconEdit, IconPlus} from "@tabler/icons";

interface FormModeToggleProps
{
    OnSegmentChange: (value: FormMode) => void;
    value: FormMode;

}

/**
 * Toggle to switch between edit and create modex.
 * @param props
 * @constructor
 */
export function FormModeToggle(props: FormModeToggleProps) {
    return (
        <SegmentedControl
            onChange={props.OnSegmentChange}
            defaultValue={FormMode.CREATE}
            value={props.value}
            data={[
                {
                    value: FormMode.UPDATE,
                    label: (
                        <Center>
                            <IconEdit size={16}/>
                            <Box ml={10}>Edit</Box>
                        </Center>
                    ),
                },
                {
                    value: FormMode.CREATE,
                    label: (
                        <Center>
                            <IconPlus size={16}/>
                            <Box ml={10}>Create</Box>
                        </Center>
                    ),
                },

            ]}
        />
    );
}
