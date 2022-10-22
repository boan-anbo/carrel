import React from 'react';


export class SelectItem<T> {
    key: string = '';
    option: React.ReactNode;
    tooltip?: string;
    data?: T;
    // key is the key of the item
    // data is the data of the item
    command?: (key: string, data: T) => void;

}
