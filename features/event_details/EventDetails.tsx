import { Center, Container, Text } from '@mantine/core';
import { css } from '@emotion/css';

import { PageWithNavigationAndDrawer } from '../../components/page/Page';
import { IEvent } from '../../utils/shared_types/Event';
import { axiosInstance } from '../../utils/services/axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Loading } from '../../components/Loader';
import Image from 'next/image';

const getEventByUuid = (uuid: string): Promise<IEvent> =>
    axiosInstance
        .get(`events/${uuid}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

export const EventDetails = () => {
    const {
        query: { uuid }
    } = useRouter();
    const { data } = useQuery(['eventDetails', uuid], () => getEventByUuid(uuid as string));

    return (
        <PageWithNavigationAndDrawer title={data?.name ?? 'Event details'}>
            <Container className={container}>
                {data ? (
                    <>
                        <Text className={title}>{data.name}</Text>
                        <Text className={organizer}>
                            {data.author.firstName} {data.author.lastName}
                        </Text>
                        <Center
                            className={css`
                                height: 256px;
                            `}
                        >
                            <Image
                                loader={() =>
                                    `https://loremflickr.com/350/256/concert?random=${Date.now()}`
                                }
                                src={`https://loremflickr.com/350/256/concert?random=${Date.now()}`}
                                alt="img"
                                width={350}
                                height={256}
                            />
                        </Center>
                        <p
                            className={paragraph}
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    </>
                ) : (
                    <Loading />
                )}
            </Container>
        </PageWithNavigationAndDrawer>
    );
};

const container = css`
    padding-top: 50px;
    padding-bottom: 10vh;
`;

const title = css`
    position: sticky;
    top: 20px;
    width: 100%;
    background-color: #fff;
    font-size: 32px;
    font-weight: 700;
`;

const organizer = css`
    font-size: 24px;
`;

const paragraph = css`
    overflow: auto;
`;
