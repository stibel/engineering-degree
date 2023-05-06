import { Group, MediaQuery, Navbar,ActionIcon } from '@mantine/core';
import { Bookmark, Friends, Map, Ticket, User } from 'tabler-icons-react';
import {css} from "@emotion/css";
import Link from 'next/link';
import { useRouter } from 'next/router';

import {IChildrenReqProps} from "../../../utils/shared_types/Children";

interface INavigationItemProps extends IChildrenReqProps {
    href: string;
    primary?: boolean;
}

const button = css`
  height: 75%;
  width: 15%;
`;

const buttonSmall = css`
  height: 62.5%;
  width: 12.5%;
`


const NavigationItem = ({ href, primary, children }: INavigationItemProps) => {
    const { pathname } = useRouter();
    const isActive = pathname === href;

    return (
        <ActionIcon
            className={primary ? button : buttonSmall}
            color={primary ? 'red' : 'violet'}
            variant={isActive ? 'filled' : 'outline'}
            mx={2.5}
        >
            <Link href={href} passHref>
                {children}
            </Link>
        </ActionIcon>
    );
};


const bar = css`
  background-color: #EAE8FB;
   height: 10vh;
  border-top: 2px solid #EAE8FB;
  border-right: 2px solid #EAE8FB;
  border-left: 2px solid #EAE8FB;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const group = css`
  height: 100%;
`

export const Navigation = () => {

    return (
        <MediaQuery largerThan={'xs'} styles={{ display: 'none' }}>
            <Navbar
                fixed
                position={{ bottom: 0, left: 0 }}
                className={bar}
                width={{
                    base: '100%'
                }}
            >
                <Group position={'center'} className={group}>
                    <NavigationItem href={'/friends'}>
                        <Friends />
                    </NavigationItem>
                    <NavigationItem href={'/profile'}>
                        <User />
                    </NavigationItem>
                    <NavigationItem primary href={'/map'}>
                        <Map />
                    </NavigationItem>
                    <NavigationItem href={'/preferences'}>
                        <Bookmark />
                    </NavigationItem>
                    <NavigationItem href={'/events'}>
                        <Ticket />
                    </NavigationItem>
                </Group>
            </Navbar>
        </MediaQuery>
    );
};
