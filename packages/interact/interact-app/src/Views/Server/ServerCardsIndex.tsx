import {Badge, Button, Card, Grid, Group, Text, Title} from "@mantine/core";
import {IconServer} from "@tabler/icons";
import {DistantDocumentSearchViewIndex} from "../Distant/DistantDocumentSearchViewIndex";
import DistantServerCardIndex from "./DistantServer/DistantServerCardIndex";
import InteractServerCardIndex from "./DbServer/InteractServerCardIndex";

export const ServerCardsIndex = () => {
    return (
        <>
            <Grid grow>
                <Grid.Col span={4}>

                   <DistantServerCardIndex/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <InteractServerCardIndex/>
                </Grid.Col>
                <Grid.Col span={4}>

                </Grid.Col>
                <Grid.Col span={4}>4</Grid.Col>
                <Grid.Col span={4}>5</Grid.Col>
            </Grid>
        </>
    )
}
