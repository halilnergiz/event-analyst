import { useState } from 'react';
import { SetValueConfig } from 'react-hook-form';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import SearchBar from './SearchBar';
import { ICreateEvent } from '../../types';


interface IMap {
    setValue: (name: keyof ICreateEvent, value: any, config?: SetValueConfig) => void;
}

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Map = ({ setValue }: IMap) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    const LocationMarker = () => {
        useMapEvents({
            dblclick(e) {
                setValue('latitude', e.latlng.lat);
                setValue('longitude', e.latlng.lng);
                setPosition(e.latlng);
            },
        });

        return position === null ? null : (
            <Marker position={position}>
                <Popup>
                    Seçili Konum
                </Popup>
            </Marker>
        );
    };

    return (
        <MapContainer
            className='map-container'
            center={[38.7080281, 35.5274213]}
            zoom={16}
            doubleClickZoom={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            <SearchBar setPosition={setPosition} />
        </MapContainer >
    );
};
