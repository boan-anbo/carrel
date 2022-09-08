/**
 * For values emitted by ANTD Select component internally when the valueInLable prop is set to true, for external changes, use the {@link SelectValue} class
 */
export interface EmittedLabledValue {
    label: string,
    value: string | undefined,
    key: string | undefined
    disabled?: boolean | undefined
}
