import {FormMode} from "./FormComponents/EFormMode";
import {Box, Center, SegmentedControl} from "@mantine/core";
import {IconEdit, IconPlus} from "@tabler/icons";

/**
 * Toggle to switch between edit and create modex.
 * @param props
 * @constructor
 */
export function FormModeToggle(props: { OnSegmentChange: (value: FormMode) => void }) {
    return (
        <SegmentedControl
            onChange={props.OnSegmentChange}
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
