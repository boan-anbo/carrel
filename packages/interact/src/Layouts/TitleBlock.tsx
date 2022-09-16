import {ReactNode} from "react";
import {Title} from "@mantine/core";

export function TitleBlock({title}: { title: string }) {
    return <div className={'border-b border-b-teal-500  text-center mb-2 pb-2 '}>
        <Title order={3}>
            {title}
        </Title>
    </div>;
}
