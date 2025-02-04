import { useEffect, useState } from 'react';
import { SetValueConfig } from 'react-hook-form';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import MapSearchInput from './MapSearchInput';
import { ICreateEvent } from '../../types';
import { useLocation } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface IMap {
  setValue?: (name: keyof ICreateEvent, value: any, config?: SetValueConfig) => void;
  eventLatitude?: string;
  eventLongitude?: string;
}

const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Map = ({ setValue, eventLatitude, eventLongitude }: IMap) => {
  const [position, setPosition] = useState<L.LatLngExpression | null>(null);
  const [center, setCenter] = useState<[number, number]>([38.7080281, 35.5274213]);
  const getURL = useLocation();

  const mapCondition = !eventLatitude || !eventLongitude || getURL.pathname.includes('update');

  useEffect(() => {
    if (eventLatitude && eventLongitude) {
      const newPosition: L.LatLngExpression = [Number(eventLatitude), Number(eventLongitude)];
      setPosition(newPosition);
      setCenter([Number(eventLatitude), Number(eventLongitude)]);
    }
  }, [eventLatitude, eventLongitude]);

  const LocationMarker = () => {
    useMapEvents({
      dblclick(e) {
        if (mapCondition) {
          setValue?.('latitude', e.latlng.lat);
          setValue?.('longitude', e.latlng.lng);
          setPosition(e.latlng);
        }
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          <div className='position-info'>
            Seçili Konum
            <ContentCopyIcon
              sx={{ cursor: 'pointer', fontSize: '18px' }}
              onClick={() => {
                const coordinates = `${L.latLng(position).lat.toFixed(6)}, ${L.latLng(
                  position
                ).lng.toFixed(6)}`;
                navigator.clipboard.writeText(coordinates);
                alert('Koordinatlar kopyalandı!');
              }}
            />
          </div>
          <div className='position-coordinates'>
            {L.latLng(position).lat.toFixed(6)}, {L.latLng(position).lng.toFixed(6)}
          </div>
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      key={`${center[0]}-${center[1]}`}
      className='map-container'
      center={center}
      zoom={16}
      doubleClickZoom={false}
      attributionControl={false}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapCondition && <MapSearchInput />}
      <LocationMarker />
    </MapContainer>
  );
};
