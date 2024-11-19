import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import NavbarSection from './components/NavbarSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import CRUDEspecie from './features/especie/CRUDEspecie'
import ProfilePage from './features/profile/ProfilePage';
import SettingsPage from './features/settings/SettingsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavbarSection />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/especies" element={<CRUDEspecie />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
