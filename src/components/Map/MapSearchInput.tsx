import { useState } from 'react';

import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

const MapSearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const map = useMap();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-expect-error - Leaflet Control.Geocoder type definition issue
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(searchText, (results: any) => {
      if (results.length > 0) {
        const result = results[0];
        const newCenter = result.center;
        map.setView(newCenter, 16);
      }
    });
  };

  return (
    <div
      className='map-search-bar'
      style={{}}
    >
      <form onClick={handleSearch}>
        <input
          type='text'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder='Konum Ara'
        />
        <button type='submit'>Ara</button>
      </form>
    </div>
  );
};

export default MapSearchInput;
