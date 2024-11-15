import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Tickets from "./pages/Tickets.tsx";
import Contact from "./pages/Contact.tsx";
import RoutesKtel from "./pages/Routes.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import React from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <hr className="navbar-divider" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<RoutesKtel />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
