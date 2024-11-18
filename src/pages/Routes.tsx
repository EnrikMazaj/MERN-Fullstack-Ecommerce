import React from "react";
import "./styles/Routes.css";

const Routes = () => {
  const busRoutes = [
    {
      time: "08:00 AM",
      bus: "Express A1",
      destination: "Athens Central",
      price: "$15",
    },
    {
      time: "10:00 AM",
      bus: "Express B2",
      destination: "Thessaloniki",
      price: "$30",
    },
    {
      time: "12:30 PM",
      bus: "Standard C3",
      destination: "Patras",
      price: "$20",
    },
    {
      time: "02:00 PM",
      bus: "Express D4",
      destination: "Heraklion",
      price: "$50",
    },
    {
      time: "04:00 PM",
      bus: "Standard E5",
      destination: "Ioannina",
      price: "$25",
    },
    {
      time: "06:00 PM",
      bus: "Express F6",
      destination: "Kalamata",
      price: "$35",
    },
  ];

  return (
    <div className="content">
      <div className="routes-container">
        <h1>Available Routes</h1>
        <div className="grid-container">
          <div className="grid-header">Time</div>
          <div className="grid-header">Bus</div>
          <div className="grid-header">Destination</div>
          <div className="grid-header">Price</div>
          {busRoutes.map((route, index) => (
            <React.Fragment key={index}>
              <div className="grid-item">{route.time}</div>
              <div className="grid-item">{route.bus}</div>
              <div className="grid-item">{route.destination}</div>
              <div className="grid-item">{route.price}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Routes;
