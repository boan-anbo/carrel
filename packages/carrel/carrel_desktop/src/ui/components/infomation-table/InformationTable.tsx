import './InformationTable.css';

interface InformationTableParams {
    children: React.ReactNode;
    title?: string;
}

export const InformationTable = (props: InformationTableParams) => {
    return (
        <div className='information-table'>
            {props.title &&
                <div className='information-table-title'>{props.title}</div>
            }
            {props.children}
        </div>
    )
}
