import {Container, Grid, ScrollArea, SimpleGrid, Skeleton, Title, useMantineTheme} from '@mantine/core';
import {CreateOrUpdateFormIndex} from "../Views/CreateOrUpdateInteraction/CreateOrUpdateFormIndex";
import {SelectedInteractionDataViewer} from "../Views/InteractViews/SelectedInteractionDataViewer";
import {RecentInteractionsList} from "../Views/RecentCreatedInteractionList/RecentInteractionsList";
import {PRIMARY_COL_HEIGHT} from "./PRIMARY_COL_HEIGHT";
import GraphMultiView from "../Views/Graph/GraphTree/GraphTreeView";
import {FilteredInteractionList} from "../Views/InteractViews/FilteredInteractionList";
import {Route} from "react-router-dom";
import {RoutingViewLinks} from "../Routing/RoutingViewLinks";
import {DistantDataEntryViewIndex} from "../Views/DistantDataEntryView/DistantDataEntryViewIndex";
import {DistantDocumentSearchViewIndex} from "../Views/Distant/DistantDocumentSearchViewIndex";
import {TitleBlock} from "../Layouts/TitleBlock";

export function MainView() {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

    return (
        <Container size={'xl'} style={{width: '100%'}} my="md">
            <SimpleGrid cols={3} spacing="md" breakpoints={[{maxWidth: 'xl', cols: 1}]}>

                <div>
                    <TitleBlock title={'Data Input'}/>
                    <ScrollArea className={'bg-gray-50 rounded drop-shadow p-4'} style={{height: PRIMARY_COL_HEIGHT}}>
                        <DistantDocumentSearchViewIndex/>
                    </ScrollArea>
                </div>
                <div>
                    <TitleBlock title={'Create or update'}/>
                    <ScrollArea className={'bg-slate-50  rounded drop-shadow'} style={{height: PRIMARY_COL_HEIGHT}}>
                        <CreateOrUpdateFormIndex/>
                    </ScrollArea>
                </div>
                <Grid gutter="md">
                    <Grid.Col>
                        <TitleBlock title={"Interaction Viewer"}/>
                        <ScrollArea className={'bg-gray-50 rounded drop-shadow'}
                                    style={{height: SECONDARY_COL_HEIGHT}}>
                            <SelectedInteractionDataViewer/>
                        </ScrollArea>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <ScrollArea className={'bg-gray-50 p-4 rounded drop-shadow'}
                                    style={{height: SECONDARY_COL_HEIGHT}}>
                            <RecentInteractionsList size={'xs'}/>
                        </ScrollArea>
                    </Grid.Col>
                    <Grid.Col span={6}>

                        <ScrollArea className={'bg-gray-50 p-4 rounded drop-shadow'}
                                    style={{height: SECONDARY_COL_HEIGHT}}>
                            <FilteredInteractionList/>
                        </ScrollArea>
                    </Grid.Col>
                </Grid>
                <Grid align={'center'} justify={'center'} gutter="md">
                    <Grid.Col span={3} >
                        <GraphMultiView
                        />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}
