import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './styles/Contact.css';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
const Contact = () => {
  const coordinates: LatLngTuple = [37.9910994, 23.7320582];

  const icon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    shadowSize: [41, 41],
  });
  return (
    <div className="content">
      <h3>You can find us here!</h3>
      <div className="map-container-wrapper">
        <MapContainer
          center={coordinates}
          zoom={15}
          scrollWheelZoom={false}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates} icon={icon}>
            <Popup>
              Ktel <br /> Attikis
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Contact;
