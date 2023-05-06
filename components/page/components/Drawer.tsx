import { useState } from 'react';
import { ActionIcon, CloseButton, Drawer as MantineDrawer } from '@mantine/core';
import { Menu2 } from 'tabler-icons-react';
import Link from 'next/link';
import {css} from "@emotion/css";

export interface IDrawerItemProps {
    title: string;
    href: string;
}

const titleWrapper = css`
  padding: 0 1rem;
  margin: 0.5rem 0;
`;

const DrawerItem = ({ href, title }: IDrawerItemProps) => (
    <Link href={href} passHref>
        <span className={titleWrapper}>{title}</span>
    </Link>
);

const iconButton = css`
  position: fixed;
  right: 10px;
  z-index: 99;
  padding: 10px;
  margin-top: 10px;
  width: 48px;
  height: 48px;
  background-color: #fff;
  border-radius: 50%;
  filter: drop-shadow(0px 0px 2px #000);
` ;

const drawer = css`
  div {
    display: flex;
    flex-flow: column; 
  }
`;

const closeButton = css`
  margin: 10px;
  align-self: flex-end;
`;

export const Drawer = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <MantineDrawer
                opened={opened}
                onClose={() => setOpened(false)}
                withCloseButton={false}
                className={drawer}
            >
                <CloseButton
                    onClick={() => setOpened(false)}
                    size={40}
                    className={closeButton}
                />
                <DrawerItem href={'/profile'} title={'Profile'} />
                <DrawerItem href={'/map'} title={'Mapa'} />
                <DrawerItem href={'/friends'} title={'Friends'} />
                <DrawerItem href={'/preferences'} title={'Preferences'} />
                <DrawerItem href={'#'} title={'Log out'} />
            </MantineDrawer>

            <ActionIcon className={iconButton} onClick={() => setOpened(!opened)}>
                <Menu2 size={40} />
            </ActionIcon>
        </>
    );
};
