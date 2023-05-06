import { Button, Center, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Apps, CalendarEvent } from 'tabler-icons-react';

import {Page} from "./page/Page";
import {useLocalStore} from "../mst/providers/app_store_provider";
import {css} from "@emotion/css";

const center = css`
  height: 100%;
`

const stack = css`
  height: 25%;
`

const button = css`
  width: 50%;
`

export const SwitchModule = () => {
    const localStore = useLocalStore();

    const router = useRouter();

    useEffect(() => {
        if (localStore.appType) router.push(`/${localStore.appType}`);
    }, []);

    const handleClick = (appType: string) => {
        localStore.setAppType(appType as any);
        router.push(`/${appType}`);
    };

    if (localStore.appType) return <>WAIT</>;

    return (
        <Page title={'Pick'}>
            <Center className={center}>
                <Stack align={'center'} className={stack}>
                    <Button
                        size={'md'}
                        className={button}
                        leftIcon={<CalendarEvent />}
                        onClick={() => handleClick('visitor')}
                    >
                        Visitor
                    </Button>
                    <Button
                        size={'md'}
                        className={button}
                        leftIcon={<Apps />}
                        onClick={() => handleClick('creator')}
                    >
                        Creator
                    </Button>
                </Stack>
            </Center>
        </Page>
    );
};
