import {Badge, Button, Card, Grid, Group, Text, Title} from "@mantine/core";
import {IconServer} from "@tabler/icons";
import {useState} from "react";
import {launchDistantServer, SideCarProcess} from "./DistantServerService";
import {CratecontrollerlistIndicesApi, CratecontrollersearchApi} from "../../../BackEnd/distant_api";
import {notify} from "../../../Services/toast/notify";
import {Logger, LogSource} from "../../../Services/logger";
import {useDistantApiStore} from "../../../zstore-distant";
import {DistantDocumentSearchViewIndex} from "../../Distant/DistantDocumentSearchViewIndex";
import {invoke} from "@tauri-apps/api";

const defaultMessage = "Check if server is running"

const log = new Logger(LogSource.DistantServer);

function DistantServerCardIndex() {


    const [serverProcess, setServerProcess] = useState<SideCarProcess | null>(null);

    const setSearchApi = useDistantApiStore((state) => state.setSearchApi);
    const setListIndicesApi = useDistantApiStore((state) => state.setListIndicesApi);

    const onLaunchServer = async () => {
        const receivedPid = await launchDistantServer()

        console.log("Received pid", receivedPid)

        if (receivedPid) {
            setServerProcess(receivedPid);

            const url = `http://localhost:${receivedPid?.port}`;
            log.info('DistantServerCardIndex url', 'DistantServerCardIndex url', url);
            const distantSearchApi = new CratecontrollersearchApi(undefined, url);
            setSearchApi(distantSearchApi);
            const distantListIndicesApi = new CratecontrollerlistIndicesApi(undefined, url);
            setListIndicesApi(distantListIndicesApi);
            // notify("DistantServerCardIndex stopped", "Distant DistantServerCardIndex", 'success');
            notify
            ("DistantServerCardIndex started", "Distant DistantServerCardIndex", 'success');
        }


    };


    async function onStopServer() {
        if (serverProcess) {
            await invoke('kill_distant_sidecar' );
            // await serverProcess.process.kill();
            // setServerProcess(null);
            // notify("DistantServerCardIndex stopped", "Distant DistantServerCardIndex", 'warning');
        }
    }

    return <>
        <Grid grow>
            <Grid.Col span={4}>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={2}>Distant Server</Title>
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

export default DistantServerCardIndex;
