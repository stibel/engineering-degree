import { Button, Center, Container, Divider, Text } from '@mantine/core';
import Link from 'next/link';
import { Hierarchy, MapPin } from 'tabler-icons-react';
import { css } from '@emotion/css';

import { Modal } from '../../../components/Modal';
import { IEvent } from '../../../utils/shared_types/Event';
import { axiosInstance } from '../../../utils/services/axios';
import { useQuery } from 'react-query';
import { Loading } from '../../../components/Loader';
import Image from 'next/image';

const getEventByUuid = (uuid: string): Promise<IEvent> =>
    axiosInstance
        .get(`events/${uuid}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

interface IEventPreviewProps {
    opened: boolean;
    setOpen: (value: boolean) => void;
    uuid: string;
}

export const EventPreview = ({ opened, setOpen, uuid }: IEventPreviewProps) => {
    const { data } = useQuery(['eventDetails', uuid], () => getEventByUuid(uuid));

    return (
        <Modal opened={opened} setOpen={setOpen}>
            <Center className={center}>
                <Image
                    loader={() => `https://loremflickr.com/350/128/concert?random=${Date.now()}`}
                    src={`https://loremflickr.com/350/128/concert?random=${Date.now()}`}
                    alt="img"
                    width={350}
                    height={128}
                />
            </Center>
            {data && data.name ? (
                <Container>
                    <Text className={name}>{data.name}</Text>
                    <Text
                        className={description}
                        dangerouslySetInnerHTML={{
                            __html: `${data.description.slice(0, 250)}...`
                        }}
                    />
                    <Link passHref href={`/event/${uuid}`}>
                        <span style={{ color: '#7064E6' }}>Show more</span>
                    </Link>
                    <Divider className={divider} />
                    <Text className={detail}>
                        <MapPin />
                        {new Date(data.startDate).toLocaleString()}
                    </Text>
                    <Text className={detail}>
                        <Hierarchy />
                        {data.author.firstName} {data.author.lastName}
                    </Text>
                    <span className={buttonsWrapper}>
                        <Button className={button} onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <Button className={button}>
                            <Link passHref href={`/event/${uuid}`}>
                                <span>Check</span>
                            </Link>
                        </Button>
                    </span>
                </Container>
            ) : (
                <Loading />
            )}
        </Modal>
    );
};

const center = css`
    height: 128px;
    border-radius: 0 0 10px 10px;
`;

const name = css`
    font-size: 24px;
    font-weight: 700;
    color: #7064e6;
`;

const description = css`
    font-size: 16px;
`;

const divider = css`
    margin: 5px 0;
`;

const detail = css`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const buttonsWrapper = css`
    margin: 40px 0 20px 0;
    display: flex;
    justify-content: space-between;
`;

const button = css`
    width: 40%;
`;
