import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './styles/Contact.css';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaWifi, FaParking, FaCoffee, FaWheelchair, FaStore } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

const Contact = () => {
  const coordinates: LatLngTuple = [37.9910994, 23.7320582];
  const { language } = useTheme();
  const t = translations[language].contact;

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
      <div className="contact-container">
        <div className="contact-info-section">
          <h1>{t.title}</h1>
          <div className="contact-details">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h3>{t.location.title}</h3>
                <p>{t.location.address1}</p>
                <p>{t.location.address2}</p>
              </div>
            </div>

            <div className="contact-item">
              <FaClock className="contact-icon" />
              <div>
                <h3>{t.hours.title}</h3>
                <p>{t.hours.weekday}</p>
                <p>{t.hours.saturday}</p>
                <p>{t.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="map-section">
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
                Ktel Attikis <br />
                {t.location.address1}, {t.location.address2}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <div className="station-facilities">
        <h2>{t.facilities.title}</h2>
        <div className="facilities-grid">
          <div className="facility-card">
            <FaTicketAlt className="facility-icon" />
            <h3>{t.facilities.ticketCollection.title}</h3>
            <p>{t.facilities.ticketCollection.description}</p>
            <ul>
              {t.facilities.ticketCollection.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="facility-card">
            <FaWifi className="facility-icon" />
            <h3>{t.facilities.wifi.title}</h3>
            <p>{t.facilities.wifi.description}</p>
            <ul>
              {t.facilities.wifi.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="facility-card">
            <FaParking className="facility-icon" />
            <h3>{t.facilities.parking.title}</h3>
            <p>{t.facilities.parking.description}</p>
            <ul>
              {t.facilities.parking.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="facility-card">
            <FaCoffee className="facility-icon" />
            <h3>{t.facilities.refreshments.title}</h3>
            <p>{t.facilities.refreshments.description}</p>
            <ul>
              {t.facilities.refreshments.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="facility-card">
            <FaWheelchair className="facility-icon" />
            <h3>{t.facilities.accessibility.title}</h3>
            <p>{t.facilities.accessibility.description}</p>
            <ul>
              {t.facilities.accessibility.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="facility-card">
            <FaStore className="facility-icon" />
            <h3>{t.facilities.store.title}</h3>
            <p>{t.facilities.store.description}</p>
            <ul>
              {t.facilities.store.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
