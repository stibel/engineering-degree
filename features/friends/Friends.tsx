import { useQuery } from 'react-query';
import { Text } from '@mantine/core';

import { PageWithNavigationAndDrawer } from '../../components/page/Page';
import { Friend } from './components/Friend';
import { PaddedContainer } from '../../components/PaddedContainer';
import { axiosInstance } from '../../utils/services/axios';

interface IFriendsRes {
    identity: string;
    labels: Array<string>;
    properties: { uuid: string };
}

const getFriends = (): Promise<Array<IFriendsRes>> =>
    axiosInstance
        .get('friends', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

export const Friends = () => {
    const { data } = useQuery('friends', getFriends);

    return (
        <PageWithNavigationAndDrawer title={'Friends'}>
            <PaddedContainer>
                {data && data.length ? (
                    data.map(({ properties: { uuid } }) => <Friend key={uuid} uuid={uuid} />)
                ) : (
                    <Text ta={'center'}>No friends yet!</Text>
                )}
            </PaddedContainer>
        </PageWithNavigationAndDrawer>
    );
};
