import {Container, Grid, ScrollArea, SimpleGrid, Skeleton, useMantineTheme} from '@mantine/core';
import {CreateOrUpdateInteractionFormView} from "../Views/CreateOrUpdateInteraction/CreateOrUpdateInteractionFormView";
import {SelectedInteractionDataViewer} from "../Views/InteractViews/SelectedInteractionDataViewer";
import {RecentInteractionsList} from "../Views/RecentCreatedInteractionList/RecentInteractionsList";
import {PRIMARY_COL_HEIGHT} from "./PRIMARY_COL_HEIGHT";
import GraphMultiView from "../Views/Graph/GraphTree/GraphTreeView";
import {FilteredInteractionList} from "../Views/InteractViews/FilteredInteractionList";

export function MainView() {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

    return (
        <Container style={{width: '100%'}} my="md">
            <SimpleGrid cols={2} spacing="md" breakpoints={[{maxWidth: 'lg', cols: 1}]}>
                {/*<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />*/}
                <ScrollArea className={'bg-slate-50  rounded drop-shadow'} style={{height: PRIMARY_COL_HEIGHT}}>
                    <CreateOrUpdateInteractionFormView/>
                </ScrollArea>
                <Grid gutter="md">
                    <Grid.Col>
                        {/*<Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false}/>*/}

                        <ScrollArea  className={'bg-gray-50 p-4 rounded drop-shadow'}
                                    style={{height: SECONDARY_COL_HEIGHT}}>
                            <SelectedInteractionDataViewer/>
                        </ScrollArea>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        {/*<Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false}/>*/}
                        <ScrollArea className={'bg-gray-50 p-4 rounded drop-shadow'}
                                    style={{height: SECONDARY_COL_HEIGHT}}>
                            <RecentInteractionsList size={'xs'}/>
                        </ScrollArea>
                    </Grid.Col>
                    <Grid.Col span={6}>

                        <ScrollArea className={'bg-gray-50 p-4 rounded drop-shadow'}
                                    style={{height: SECONDARY_COL_HEIGHT}}>
                            <FilteredInteractionList />
                        </ScrollArea>
                        {/*<Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false}/>*/}
                    </Grid.Col>
                </Grid>
                <Grid gutter="md">
                    <Grid.Col>
                    <GraphMultiView
                    />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}
