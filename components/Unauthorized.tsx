import { Button, Center, Text } from '@mantine/core';
import Link from 'next/link';
import { LockAccess, Login } from 'tabler-icons-react';
import {css} from "@emotion/css";

const root = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 4rem
`

export const Unauthorized = () => {
    return (
        <Center className={root}>
            <Text size={'xl'}>You are not logged in</Text>
            <LockAccess size={150} />
            <Link href={'/login'} passHref>
                <Button size={'md'} style={{ width: '50%' }} leftIcon={<Login />}>
                    Log in
                </Button>
            </Link>
        </Center>
    );
};
