import {useState} from 'react';
import {Anchor, Burger, Container, createStyles, Group, Header} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {MantineLogo} from '@mantine/ds';
import {IconSearch} from "@tabler/icons";
import {openSpotlight} from "@mantine/spotlight";
import {MainHeaderLinkProps} from "./MainHeaderLinkProps";
import {MainHeaderNavLinks} from "./MainHeaderNavLinks";

const HEADER_HEIGHT = 84;

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    links: {
        paddingTop: theme.spacing.lg,
        height: HEADER_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    mainLinks: {
        marginRight: -theme.spacing.sm,
    },

    mainLink: {
        textTransform: 'uppercase',
        fontSize: 13,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        padding: `7px ${theme.spacing.sm}px`,
        fontWeight: 700,
        borderBottom: '2px solid transparent',
        transition: 'border-color 100ms ease, color 100ms ease',

        '&:hover': {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            textDecoration: 'none',
        },
    },

    secondaryLink: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        fontSize: theme.fontSizes.xs,
        textTransform: 'uppercase',
        transition: 'color 100ms ease',

        '&:hover': {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            textDecoration: 'none',
        },
    },

    mainLinkActive: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottomColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6],
    },
}));

export interface NavLinkProps {
    label: string;
    link: string;
}

export function MainHeader(props: {
                               onNavLinks: (link: NavLinkProps) => void
                           }
) {
    const [opened, {toggle}] = useDisclosure(false);
    const {classes, cx} = useStyles();
    const [active, setActive] = useState(0);
    const mainItems = MainHeaderNavLinks.mainLinks.map((item, index) => (
        <Anchor<'a'>
            href={item.link}
            key={item.label}
            className={cx(classes.mainLink, {[classes.mainLinkActive]: index === active})}
            onClick={(event) => {
                event.preventDefault();
                setActive(index);
                props.onNavLinks(item);
            }}
        >
            {item.label}
        </Anchor>
    ));

    const secondaryItems = MainHeaderNavLinks.userLinks.map((item) => (
        <Anchor<'a'>
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault()
                props.onNavLinks(item);
            }}
            className={classes.secondaryLink}
        >
            {item.label}
        </Anchor>
    ));

    return (
        <Header height={HEADER_HEIGHT} mb={5}>
            <Container className={classes.inner}>

                <MantineLogo size={34}/>
                <div className={classes.links}>
                    <Group position="right">
                        <Group>


                            {<IconSearch size={16}
                                         onClick={() => {
                                             openSpotlight()
                                         }}
                                         stroke={1.5}/>}
                        </Group>
                        <Group>
                            {secondaryItems}
                        </Group>
                    </Group>
                    <Group spacing={0} position="right" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </div>
                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>
            </Container>
        </Header>
    );
}
