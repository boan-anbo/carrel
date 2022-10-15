import {Button, Center, Checkbox, Container, Flex} from '@chakra-ui/react';
import clsx from 'clsx';
import {Tooltip} from '../../../Tooltip/Tooltip';
import {SelectItem} from './ISelectItem';
import styles from './SelectListItem.module.scss';

export interface SelectListItemProps<T> {
    selectionMode?: 'single' | 'multiple' | 'none';
    selected?: boolean;
    item: SelectItem<T>;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    onSelectionChange: (item: SelectItem<T>, select: boolean) => void;
    showCheckbox?: boolean;
    align?: 'start' | 'center' | 'end';

}

export function SelectListItem({
                                   item,
                                   selectionMode,
                                   selected = false,
                                   size = 'xs',
                                   onSelectionChange,
                                   showCheckbox = true, 
                                   ...props
                               }: SelectListItemProps<unknown>
) {
    const onClickItem = () => {
        onSelectionChange(item, !selected)
        if (item.command) {
            item.command(item.key, item.data);
        }
    }
    return (
        <Container px='2' py='0' h='full' w='full' maxH='full' maxW="full">
            <Flex
            h='full'
            >
                {
                    showCheckbox &&
                    <Center px='1'>
                        <Checkbox
                            isChecked={selected}
                            onChange={() => onSelectionChange(item, !selected)}
                        />
                    </Center>
                }
                <Tooltip content={item?.tooltip}>
                    <Button
                        onClick={onClickItem}
                        backgroundColor={clsx(
                            {
                                "transparent": !selected,
                                "primaryBgHover": selected,
                            }
                        )}
                        textColor="primaryText"
                        _hover={{
                            backgroundColor: "var(--chakra-colors-primaryBgHover)",
                        }}
                        size={size}
                        py="0"
                        w="full"
                        className={styles.button}
                        fontWeight="semibold"
                        justifyContent={props.align}
                    >
                        
                        {item?.option}
                    </Button>
                </Tooltip>
            </Flex>
        </Container>
    );
}
