import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './styles/Contact.css';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaWifi, FaParking, FaCoffee, FaWheelchair, FaStore } from 'react-icons/fa';

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
      <div className="contact-container">
        <div className="contact-info-section">
          <h1>Visit Our Station</h1>
          <div className="contact-details">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h3>Main Station Location</h3>
                <p>123 Station Liosia</p>
                <p>Dexamenis 21, Attiki</p>
              </div>
            </div>

            <div className="contact-item">
              <FaClock className="contact-icon" />
              <div>
                <h3>Station Hours</h3>
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
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
                123 Station Liosia, Dexamenis 21
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <div className="station-facilities">
        <h2>Station Facilities & Services</h2>
        <div className="facilities-grid">
          <div className="facility-card">
            <FaTicketAlt className="facility-icon" />
            <h3>Ticket Collection</h3>
            <p>Collect your pre-booked tickets from our ticket office or self-service kiosks</p>
            <ul>
              <li>Bring your booking reference</li>
              <li>Valid ID required</li>
              <li>Print at home option available</li>
            </ul>
          </div>

          <div className="facility-card">
            <FaWifi className="facility-icon" />
            <h3>Free WiFi</h3>
            <p>Stay connected with our complimentary high-speed WiFi</p>
            <ul>
              <li>Available throughout the station</li>
              <li>No time limit</li>
              <li>Secure connection</li>
            </ul>
          </div>

          <div className="facility-card">
            <FaParking className="facility-icon" />
            <h3>Parking</h3>
            <p>Secure parking facilities for all passengers</p>
            <ul>
              <li>24/7 surveillance</li>
              <li>Short and long-term options</li>
              <li>Disabled parking available</li>
            </ul>
          </div>

          <div className="facility-card">
            <FaCoffee className="facility-icon" />
            <h3>Refreshments</h3>
            <p>Various dining options available</p>
            <ul>
              <li>Café and restaurant</li>
              <li>Snack kiosks</li>
              <li>Vending machines</li>
            </ul>
          </div>

          <div className="facility-card">
            <FaWheelchair className="facility-icon" />
            <h3>Accessibility</h3>
            <p>Fully accessible facilities for all passengers</p>
            <ul>
              <li>Wheelchair ramps</li>
              <li>Accessible restrooms</li>
              <li>Priority boarding</li>
            </ul>
          </div>

          <div className="facility-card">
            <FaStore className="facility-icon" />
            <h3>Convenience Store</h3>
            <p>Travel essentials and last-minute items</p>
            <ul>
              <li>Travel accessories</li>
              <li>Snacks and drinks</li>
              <li>Basic necessities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
