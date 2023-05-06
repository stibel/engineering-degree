import { Container, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { css } from '@emotion/css';

import { Preference } from './components/Preference';
import { PageWithNavigationAndDrawer } from '../../components/page/Page';
import { axiosInstance } from '../../utils/services/axios';
import { mb } from '../../components/css_helpers/margin';
import { pt } from '../../components/css_helpers/padding';

const getCategories = (): Promise<Array<ICategory>> =>
    axiosInstance
        .get('categories', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

interface ICategory {
    name: string;
    description: string;
    uuid: string;
}

export const Preferences = () => {
    const { data: preferences } = useQuery('categories', getCategories);

    return (
        <PageWithNavigationAndDrawer title={'Preferences'}>
            <Container className={container}>
                <Title className={title}>Wybierz zainteresowania</Title>
                {preferences && preferences.length
                    ? preferences.map(preference => (
                          <Preference key={preference.name} preference={preference} />
                      ))
                    : 'No preferences to show yet!'}
            </Container>
        </PageWithNavigationAndDrawer>
    );
};

const title = css`
    position: sticky;
    top: 2rem;
    ${mb(2)};
    font-size: 1.8rem;
    font-weight: 700;
    background-color: #fff;
`;

const container = css`
    ${pt(5)};
    padding-bottom: 10vh;
`;
