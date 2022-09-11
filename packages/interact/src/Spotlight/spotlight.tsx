import { Button, Group } from '@mantine/core';
import { SpotlightProvider, openSpotlight } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { IconHome, IconDashboard, IconFileText, IconSearch } from '@tabler/icons';

export function SpotlightControl() {
    return (
        <Group position="center">
        <Button onClick={() => openSpotlight()}>Open spotlight</Button>
    </Group>
);
}

export const spotlightActions: SpotlightAction[] = [
    {
        title: 'Home',
        description: 'Get to home page',
        onTrigger: () => console.log('Home'),
        icon: <IconHome size={18} />,
},
{
    title: 'Dashboard',
        description: 'Get full information about current system status',
    onTrigger: () => console.log('Dashboard'),
    icon: <IconDashboard size={18} />,
},
{
    title: 'Documentation',
        description: 'Visit documentation to lean more about all features',
    onTrigger: () => console.log('Documentation'),
    icon: <IconFileText size={18} />,
},
];

