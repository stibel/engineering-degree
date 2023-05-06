import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { css } from '@emotion/css';
import { Text } from '@mantine/core';

import { axiosInstance } from '../../utils/services/axios';
import { PageWithNavigationAndDrawer } from '../../components/page/Page';
import { PaddedContainer } from '../../components/PaddedContainer';

const getCategoryByUuid = (uuid: string): Promise<ICategory> =>
    axiosInstance
        .get(`categories/${uuid}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

interface ICategory {
    uuid: string;
    name: string;
    description: string;
    imageUrl: string;
}

export const PreferenceDetails = () => {
    const {
        query: { uuid }
    } = useRouter();
    const { data: preference } = useQuery('categories', () => getCategoryByUuid(uuid as string));

    return (
        <PageWithNavigationAndDrawer title={preference?.name ?? 'Preference'}>
            <PaddedContainer>
                <Text align={'center'} size={'xl'}>
                    {preference?.name}
                </Text>
                <Image
                    className={css`
                        width: 100%;
                        height: auto;
                    `}
                    loader={() => `https://loremflickr.com/240/320/concert?random=${Date.now()}`}
                    src={`https://loremflickr.com/240/320/concert?random=${Date.now()}`}
                    alt={preference?.name ?? ''}
                    width={240}
                    height={320}
                />
                <Text size={'md'}>{preference?.description}</Text>
            </PaddedContainer>
        </PageWithNavigationAndDrawer>
    );
};
