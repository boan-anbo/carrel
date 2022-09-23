import {Badge, Button, Card, Grid, Group, Text, Title} from "@mantine/core";
import {IconServer} from "@tabler/icons";
import {useState} from "react";
import {Logger, LogSource} from "../../../Services/logger";
import {DistantDocumentSearchViewIndex} from "../../Distant/DistantDocumentSearchViewIndex";
import {invoke} from "@tauri-apps/api";
import {SideCarProcess} from "./InteractServerService";

const defaultMessage = "Check if server is running"

const log = new Logger(LogSource.InteractServerIndex);

function InteractServerCardIndex() {


    const [serverProcess, setServerProcess] = useState<SideCarProcess | null>(null);


    const onLaunchServer = async () => {
        log.info('Launching server');
       await invoke('launch_db_sidecar');
    };


    async function onStopServer() {
      await invoke('kill_db_sidecar');
    }

    return <>
        <Grid grow>
            <Grid.Col span={4}>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={2}>Interact Server</Title>
                    <Group position='center'>
                        <Card.Section>
                            <IconServer alignmentBaseline={'central'} size={160}/>
                        </Card.Section>
                    </Group>
                    <Group position="center" mt="md" mb="xs">
                        <Badge color="pink" variant="light">
                            {serverProcess?.port ? `Running: ${serverProcess.port}` : "Stopped"}
                        </Badge>
                    </Group>

                    <Text size="sm" className={'text-center'} color="dimmed">
                        Distant Server
                    </Text>

                    <Button
                        onClick={onLaunchServer
                        }
                        variant="light" color="blue" fullWidth mt="md" radius="md">
                        Launch server
                    </Button>
                    <Button
                        onClick={onStopServer}
                        variant="light" color="blue" fullWidth mt="md" radius="md">
                        Stop server
                    </Button>
                </Card>
            </Grid.Col>
            <Grid.Col span={4}>
                <DistantDocumentSearchViewIndex/>
            </Grid.Col>
            <Grid.Col span={4}>

            </Grid.Col>
            <Grid.Col span={4}>4</Grid.Col>
            <Grid.Col span={4}>5</Grid.Col>
        </Grid>
    </>;
}

export default InteractServerCardIndex;
