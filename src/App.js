import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import NavbarSection from './components/NavbarSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import ProfilePage from './features/profile/ProfilePage';
import SettingsPage from './features/settings/SettingsPage';
import EspeciesList from './components/especieList';
import Home from './components/homePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavbarSection />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/especies" element={<EspeciesList />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
