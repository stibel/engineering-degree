import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { TextInput } from '@mantine/core';
import mapboxgl from 'mapbox-gl';
import { css } from '@emotion/css';
import { Button } from '@mantine/core';

import { PageWithDrawer } from '../../components/page/Page';
import { FullParentStack } from '../../components/FullParentStack';
import { PaddedContainer } from '../../components/PaddedContainer';
import { axiosInstance } from '../../utils/services/axios';
import { handleFormSubmit } from '../../utils/handle_form_submit';
import { useQuery } from 'react-query';
import { pb, pr } from '../../components/css_helpers/padding';
import { mr } from '../../components/css_helpers/margin';

const createEventMutation = (data: ICreateEventFormValues, coordinates: [number, number]) =>
    axiosInstance.post(
        'events/',
        { ...data, location: { type: 'Point', coordinates } },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        }
    );

const getAddress = (coordinates: [number, number]) => {
    const [lng, lat] = coordinates;
    return fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
};

interface ICreateEventFormValues {
    name: string;
    description: string;
    startDate: Date;
}

mapboxgl.accessToken =
    'pk.eyJ1Ijoic3RpYmVsIiwiYSI6ImNsY3RnOWtiaDBrbXkzcXA0YXhoYm1yaG0ifQ.pHnRTJbsV1uGL_Rr__vZBA'; //TODO(Mikołaj): refresh this and move to .env file

export const CreateEvent = () => {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, setLng] = useState(21.009024);
    const [lat, setLat] = useState(52.220936);
    const [zoom, setZoom] = useState(15);
    const [address, setAddress] = useState('');
    const { register, handleSubmit } = useForm<ICreateEventFormValues>();
    const { push } = useRouter();

    const createAddressLabel = (
        road?: string,
        house_number?: string,
        city?: string,
        country?: string
    ) => {
        console.log({ road, house_number, city, country });
        const streetLabel = road && house_number ? `${road} ${house_number}, ` : '';
        const cityLabel = city ? `${city}, ` : '';
        const countryLabel = country ? `${country}` : '';
        return streetLabel + cityLabel + countryLabel === ''
            ? 'Could not compute address'
            : streetLabel + cityLabel + countryLabel;
    };

    useEffect(() => {
        (async () => {
            const response = await getAddress([lng, lat]);
            const data = await response.json();
            const {
                address: { road, house_number, city, country }
            } = data;
            console.log(data);
            setAddress(createAddressLabel(road, house_number, city, country));
        })();
    }, [lng, lat]);

    const onSubmit = async (data: ICreateEventFormValues) =>
        handleFormSubmit(createEventMutation(data, [lat, lng]), {
            onSuccess: ({ data }) => push(`/event/${data.uuid}/`)
        });

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom
        });
    });

    useEffect(() => {
        if (!map.current) return;
        const marker = new mapboxgl.Marker({ draggable: true })
            .setLngLat([lng, lat])
            .addTo(map.current);
        marker.on('dragend', () => {
            const coordinates = marker.getLngLat();
            setLat(coordinates.lat);
            setLng(coordinates.lng);
        });

        return function cleanup() {
            marker.remove();
        };
    }, []);

    useEffect(() => console.log({ lng, lat }), [lng, lat]);

    return (
        <PageWithDrawer title="Create event">
            <FullParentStack>
                <PaddedContainer
                    className={css`
                        padding-top: 2rem !important;
                        height: 45vh;
                    `}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextInput {...register('name')} label={'Name'} required />
                        <TextInput {...register('description')} label={'Description'} required />
                        <div
                            className={css`
                                ${pb(2.1)};
                                display: flex;
                                flex-direction: column;
                            `}
                        >
                            <label
                                className={css`
                                    font-size: 14px;
                                `}
                                htmlFor={'date'}
                            >
                                Start date
                            </label>
                            <input
                                className={css`
                                    ${mr(1)};
                                    height: 36px;
                                    width: 100%;
                                `}
                                type={'date'}
                                {...register('startDate')}
                                required
                            />
                        </div>
                        <Button
                            className={css`
                                width: 100%;
                            `}
                            type="submit"
                        >
                            Create
                        </Button>
                    </form>
                </PaddedContainer>
                <div className={mapWrapper} ref={mapContainer} />
                <div className={addressBox}>{address}</div>
                <div className={coordinatesBox}>
                    <span>Lat: {lat.toFixed(2)}</span>
                    <span>Lng: {lng.toFixed(2)}</span>
                </div>
            </FullParentStack>
        </PageWithDrawer>
    );
};

const mapWrapper = css`
    width: 100%;
    height: 60vh;
`;

const addressBox = css`
    position: fixed;
    top: 50vh;
    margin: 0 1rem;
    padding: 1rem;
    height: 75px;
    width: calc(100% - 2rem);
    border-radius: 15px;
    background-color: #7064e6;
`;

const coordinatesBox = css`
    position: fixed;
    top: 65vh;
    right: 1rem;
    padding: 1rem;
    height: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 15px;
    background-color: #7064e6;
`;
