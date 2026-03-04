import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px'
};

const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
};

const MapPicker = ({ location, setLocation, readOnly = false }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOUR_API_KEY_HERE" // Ideally loaded from env
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const handleMapClick = (e) => {
        if (readOnly) return;
        setLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
    };

    const center = location.lat && location.lng ? location : defaultCenter;

    return isLoaded ? (
        <div className="rounded-lg overflow-hidden border border-gray-300">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={location.lat ? 12 : 4}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
                options={{ disableDefaultUI: readOnly, draggableCursor: readOnly ? 'default' : 'crosshair' }}
            >
                {location.lat && location.lng && (
                    <Marker position={location} />
                )}
            </GoogleMap>
        </div>
    ) : <div className="h-[300px] w-full bg-gray-100 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500">Loading Map...</div>;
};

export default React.memo(MapPicker);
