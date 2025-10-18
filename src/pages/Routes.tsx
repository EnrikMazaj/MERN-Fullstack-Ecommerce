import React, { useState } from 'react';
import './styles/Routes.css';
import '../styles/common.css';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

interface RouteInfo {
  id: string;
  origin: string;
  destination: string;
  duration: string;
  frequency: string;
  basePrice: number;
}

const Routes = () => {
  const { language } = useTheme();
  const t = translations[language].routes;

  const [searchTerm, setSearchTerm] = useState('');

  // Hardcoded route information (general timetable, not specific departures)
  const routesList: RouteInfo[] = [
    {
      id: '1',
      origin: 'Athens',
      destination: 'Thessaloniki',
      duration: '5h 30min',
      frequency: language === 'el' ? 'Καθημερινά, κάθε 2 ώρες' : 'Daily, every 2 hours',
      basePrice: 35
    },
    {
      id: '2',
      origin: 'Athens',
      destination: 'Patras',
      duration: '3h 15min',
      frequency: language === 'el' ? 'Καθημερινά, κάθε ώρα' : 'Daily, every hour',
      basePrice: 22
    },
    {
      id: '3',
      origin: 'Athens',
      destination: 'Heraklion',
      duration: '8h 45min',
      frequency: language === 'el' ? '3 φορές την εβδομάδα' : '3 times per week',
      basePrice: 48
    },
    {
      id: '4',
      origin: 'Athens',
      destination: 'Larissa',
      duration: '4h 20min',
      frequency: language === 'el' ? 'Καθημερινά, κάθε 3 ώρες' : 'Daily, every 3 hours',
      basePrice: 28
    },
    {
      id: '5',
      origin: 'Athens',
      destination: 'Volos',
      duration: '4h 00min',
      frequency: language === 'el' ? 'Καθημερινά, 4 φορές την ημέρα' : 'Daily, 4 times a day',
      basePrice: 26
    },
    {
      id: '6',
      origin: 'Athens',
      destination: 'Kalamata',
      duration: '3h 30min',
      frequency: language === 'el' ? 'Καθημερινά, κάθε 2 ώρες' : 'Daily, every 2 hours',
      basePrice: 24
    },
    {
      id: '7',
      origin: 'Athens',
      destination: 'Ioannina',
      duration: '6h 15min',
      frequency: language === 'el' ? '2 φορές την ημέρα' : '2 times a day',
      basePrice: 38
    },
    {
      id: '8',
      origin: 'Thessaloniki',
      destination: 'Athens',
      duration: '5h 30min',
      frequency: language === 'el' ? 'Καθημερινά, κάθε 2 ώρες' : 'Daily, every 2 hours',
      basePrice: 35
    }
  ];

  const filteredRoutes = routesList.filter(route =>
    route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return `${price} €`;
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="base-content routes-content">
        <div className="routes-container">
          <h1>{t.title}</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder={language === 'el' ? 'Αναζήτηση διαδρομών...' : 'Search routes...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {filteredRoutes.length === 0 ? (
            <div className="no-routes">
              <p>{language === 'el' ? 'Δεν βρέθηκαν διαδρομές' : 'No routes found'}</p>
            </div>
          ) : (
            <div className="routes-table-container">
              <table className="routes-table">
                <thead>
                  <tr>
                    <th>{language === 'el' ? 'Διαδρομή' : 'Route'}</th>
                    <th>{language === 'el' ? 'Διάρκεια' : 'Duration'}</th>
                    <th>{language === 'el' ? 'Συχνότητα' : 'Frequency'}</th>
                    <th>{language === 'el' ? 'Τιμή από' : 'Price from'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.map((route) => (
                    <tr key={route.id}>
                      <td data-label={language === 'el' ? 'Διαδρομή' : 'Route'}>
                        <div className="route-destinations">
                          <span className="origin">{route.origin}</span>
                          <span className="arrow">→</span>
                          <span className="destination">{route.destination}</span>
                        </div>
                      </td>
                      <td data-label={language === 'el' ? 'Διάρκεια' : 'Duration'}>
                        <span className="duration">{route.duration}</span>
                      </td>
                      <td data-label={language === 'el' ? 'Συχνότητα' : 'Frequency'}>
                        <span className="frequency">{route.frequency}</span>
                      </td>
                      <td data-label={language === 'el' ? 'Τιμή από' : 'Price from'}>
                        <span className="price">{formatPrice(route.basePrice)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Routes;
