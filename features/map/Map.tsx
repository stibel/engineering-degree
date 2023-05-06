import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { PageWithNavigationAndDrawer } from '../../components/page/Page';
import { EventPreview } from './components/EventPreview';
import { axiosInstance } from '../../utils/services/axios';
import { useQuery } from 'react-query';

// mapboxgl.baseApiUrl = 'https://joinus.kalinowski.one/api/v1/mapbox/tiles/';
mapboxgl.accessToken =
    'pk.eyJ1Ijoic3RpYmVsIiwiYSI6ImNsY3RnOWtiaDBrbXkzcXA0YXhoYm1yaG0ifQ.pHnRTJbsV1uGL_Rr__vZBA'; //TODO(Mikołaj): refresh this and move to .env file

const getTiles = () =>
    axiosInstance
        .get('mapbox/tiles/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

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

const getEvents = (): Promise<Array<IEvent>> =>
    axiosInstance
        .get('events', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(res => res.data);

const mapWrapper = css`
    height: 100%;
`;

export const Map = () => {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, setLng] = useState(19.0069);
    const [lat, setLat] = useState(52.2329);
    const [zoom, setZoom] = useState(4.3);
    const [modalOpened, setModalOpened] = useState(false);
    const [activeUuid, setActiveUuid] = useState('');
    const { data } = useQuery('events', getEvents);

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
        let markers: Array<mapboxgl.Marker> = [];
        if (map.current) {
            data?.map(event => {
                const innerHtmlContent = `
                <div style="display:flex;flex-direction:column;">
                    <h3>${event.name}</h3>
                    <span>${event.author.firstName} ${event.author.lastName}</span>
                </div>
                `;

                const divElement = document.createElement('div');
                const assignBtn = document.createElement('div');
                assignBtn.innerHTML = `<button style="width:100%;">See details</button>`;
                divElement.innerHTML = innerHtmlContent;
                divElement.appendChild(assignBtn);
                // btn.className = 'btn';
                assignBtn.addEventListener('click', () => {
                    setActiveUuid(event.uuid);
                    setModalOpened(true);
                });
                const [lng, lat] = event.location.coordinates;
                const marker = new mapboxgl.Marker(
                    (
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'pink',
                                borderRadius: '50%',
                                cursor: 'pointer'
                            }}
                        />
                    ) as any
                )
                    //@ts-ignore
                    .setLngLat([lat, lng])
                    .setPopup(new mapboxgl.Popup({ offset: 25 }).setDOMContent(divElement))
                    .addTo(map.current);
                markers.push(marker);
            });
        }
        return function cleanup() {
            markers.forEach(marker => marker.remove());
        };
    }, [data]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <PageWithNavigationAndDrawer title={'Map'}>
            <>
                <EventPreview opened={modalOpened} setOpen={setModalOpened} uuid={activeUuid} />
                {/*FIXME(Mikołaj): remove div below*/}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'rgba(35, 55, 75, 0.9)',
                        color: '#fff',
                        padding: '6px 12px',
                        fontFamily: 'monospace',
                        zIndex: 1,
                        position: 'absolute',
                        top: '50px',
                        right: 0,
                        margin: '12px',
                        borderRadius: '4px'
                    }}
                >
                    <span>Lng: {lng}</span>
                    <span>Lat: {lat}</span>
                    <span>Zoom: {zoom}</span>
                </div>
                <div className={mapWrapper} ref={mapContainer} />
            </>
        </PageWithNavigationAndDrawer>
    );
};
