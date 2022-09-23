export interface MultiSelectValue<T> {
    label: string;
    value: string;
    /**
     * {@deprecated}
     */
    data?: T | null;
}
