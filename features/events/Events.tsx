import { PageWithNavigationAndDrawer } from '../../components/page/Page';
import { PaddedContainer } from '../../components/PaddedContainer';
import { axiosInstance } from '../../utils/services/axios';
import { useQuery } from 'react-query';
import { Event } from './components/Event';
import { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import debounce from 'lodash.debounce';
import { css } from '@emotion/css';
import { mb } from '../../components/css_helpers/margin';

const getEvents = (): Promise<Array<IEvent>> =>
    axiosInstance
        .get('events', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

const getEventsByPhrase = (phrase: string): Promise<Array<IEvent>> =>
    axiosInstance.get(`events/search/all?query=${phrase}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });

export interface IEvent {
    uuid: string;
    author: {
        uuid: string;
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        createdAt: string;
    };
    name: string;
    location: {
        coordinates: [number, number];
    };
    startDate: string;
    description: string;
}

export const Events = () => {
    const [phrase, setPhrase] = useState('');
    const { data } = useQuery('events', getEvents);
    const searchRes = useQuery('eventsSearch', () => getEventsByPhrase(phrase), { retry: false });
    useEffect(() => console.log(searchRes), [searchRes]);
    useEffect(() => console.log(phrase), [phrase]);
    const onChange = debounce((value: string) => setPhrase(value), 300);

    return (
        <PageWithNavigationAndDrawer title="Events">
            <PaddedContainer>
                <TextInput
                    className={textInput}
                    icon={<Search />}
                    onChange={e => onChange(e.target.value)}
                />
                <ul className={list}>
                    {data && data.length
                        ? data.map(event => <Event key={event.uuid} {...event} />)
                        : 'No events to show'}
                </ul>
            </PaddedContainer>
        </PageWithNavigationAndDrawer>
    );
};

const textInput = css`
    position: sticky;
    top: 4rem;
    ${mb(1)};
`;


const list = css`
    padding: 0;
    list-style-type: none;
`
