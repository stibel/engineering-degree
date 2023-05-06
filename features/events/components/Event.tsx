import { IEvent } from '../Events';
import { Flex, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { mb } from '../../../components/css_helpers/margin';
import { css } from '@emotion/css';

interface IEventProps extends IEvent {}

export const Event = (props: IEventProps) => {
    return (
        <li className={listItem}>
            <Link className={link} href={`/event/${props.uuid}/`}>
                <Flex justify={'space-between'}>
                    <Stack>
                        <Text fw={700}>{props.name}</Text>
                        <Text fw={500}>{props.author.firstName + props.author.lastName}</Text>
                    </Stack>
                    <Text>{new Date(props.startDate).toLocaleDateString()}</Text>
                </Flex>
            </Link>
        </li>
    );
};

const listItem = css`
    ${mb(1)};
    padding: 1rem;
    width: 100%;
    background-color: #7064e6;
    border-radius: 1rem;
`;

const link = css`
    color: #fff;
    text-decoration: none;
`;
