import React from 'react';
import './styles/Routes.css';
import '../styles/common.css';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

const Routes = () => {
  const { language } = useTheme();
  const t = translations[language].routes;

  const busRoutes = [
    {
      time: '08:00 AM',
      bus: 'Express A1',
      destination: 'Athens Central',
      price: '20 €',
    },
    {
      time: '10:00 AM',
      bus: 'Express B2',
      destination: 'Thessaloniki',
      price: '20 €',
    },
    {
      time: '12:30 PM',
      bus: 'Standard C3',
      destination: 'Patras',
      price: '20 €',
    },
    {
      time: '02:00 PM',
      bus: 'Express D4',
      destination: 'Heraklion',
      price: '20 €',
    },
    {
      time: '04:00 PM',
      bus: 'Standard E5',
      destination: 'Ioannina',
      price: '20 €',
    },
    {
      time: '06:00 PM',
      bus: 'Express F6',
      destination: 'Kalamata',
      price: '20 €',
    },
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="base-content routes-content">
        <div className="routes-container">
          <h1>{t.title}</h1>
          <div className="grid-container">
            <div className="grid-header">{t.gridHeaders.time}</div>
            <div className="grid-header">{t.gridHeaders.bus}</div>
            <div className="grid-header">{t.gridHeaders.destination}</div>
            <div className="grid-header">{t.gridHeaders.price}</div>
            {busRoutes.map((route, index) => (
              <React.Fragment key={index}>
                <div className="grid-item" data-label={t.gridHeaders.time}>{route.time}</div>
                <div className="grid-item" data-label={t.gridHeaders.bus}>{route.bus}</div>
                <div className="grid-item" data-label={t.gridHeaders.destination}>{route.destination}</div>
                <div className="grid-item" data-label={t.gridHeaders.price}>{route.price}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;
