import {Container, Grid, ScrollArea, SimpleGrid, Skeleton, useMantineTheme} from '@mantine/core';
import {CreateOrUpdateFormIndex} from "../CreateOrUpdateInteraction/CreateOrUpdateFormIndex";
import {SelectedInteractionDataViewer} from "../InteractViews/SelectedInteractionDataViewer";
import {RecentInteractionsList} from "../RecentCreatedInteractionList/RecentInteractionsList";
import {PRIMARY_COL_HEIGHT} from "../../MainViews/PRIMARY_COL_HEIGHT";
import GraphMultiView from "../Graph/GraphTree/GraphTreeView";
import {FilteredInteractionList} from "../InteractViews/FilteredInteractionList";
import {DistantDocumentSearchViewIndex} from "../Distant/DistantDocumentSearchViewIndex";

export function DistantDataEntryViewIndex() {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

    return (
        <Container size={'xl'} style={{width: '100%'}} my="md">
            <SimpleGrid cols={3} spacing="md" breakpoints={[{maxWidth: 'lg', cols: 1}]}>
                {/*<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />*/}
                <ScrollArea className={'bg-slate-50  rounded drop-shadow'} style={{height: PRIMARY_COL_HEIGHT}}>
                    <CreateOrUpdateFormIndex/>
                </ScrollArea>
                <ScrollArea style={{height: PRIMARY_COL_HEIGHT}}>

                    <DistantDocumentSearchViewIndex/>
                </ScrollArea>

                <Grid gutter="md">
                    <Grid.Col>
                        <SelectedInteractionDataViewer/>
                    </Grid.Col>
                    <Grid.Col>
                        <RecentInteractionsList/>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}
