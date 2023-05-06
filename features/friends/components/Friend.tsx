import { useState } from 'react';
import { ActionIcon, Button, Center, Container } from '@mantine/core';
import { MessageCircle, TrashX } from 'tabler-icons-react';
import { css } from '@emotion/css';

import { Modal } from '../../../components/Modal';
import { axiosInstance } from '../../../utils/services/axios';
import { useMutation, useQuery } from 'react-query';

interface IUser {
    firstName: string;
    lastName: string;
}

const getUser = (uuid: string): Promise<IUser> => axiosInstance.get(`users/${uuid}`);

const removeFriend = (uuid: string) => axiosInstance.delete(`friends/${uuid}`);

interface IFriendProps {
    uuid: string;
}

export const Friend = ({ uuid }: IFriendProps) => {
    const { data } = useQuery(['user', uuid], () => getUser(uuid));
    const { mutate } = useMutation((uuid: string) => removeFriend(uuid));
    const [removeFriendModalOpened, setRemoveFriendModalOpened] = useState(false);

    return (
        <Container fluid className={wrapper}>
            {`${data?.firstName} ${data?.lastName}`}
            <span style={{ display: 'flex' }}>
                <ActionIcon>
                    <MessageCircle />
                </ActionIcon>
                <ActionIcon onClick={() => setRemoveFriendModalOpened(true)}>
                    <TrashX />
                </ActionIcon>
            </span>
            <Modal opened={removeFriendModalOpened} setOpen={setRemoveFriendModalOpened}>
                <Center className={center}>
                    Are you sure you want to remove friend?
                    <Container fluid className={buttonsWrapper}>
                        <Button onClick={() => mutate(uuid)}>Yes</Button>
                        <Button onClick={() => setRemoveFriendModalOpened(false)}>No</Button>
                    </Container>
                </Center>
            </Modal>
        </Container>
    );
};

const wrapper = css`
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
`;

const center = css`
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const buttonsWrapper = css`
    padding: 0 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
