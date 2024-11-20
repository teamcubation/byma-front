import React from 'react';
import './styles/App.css';
import NavbarSection from './components/navbar/NavbarSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TablaEmisores } from './features/tabla/TablaEmisores';
import { Buscador } from './components/buscador/Buscador';
import { CaminoNavegacion } from './components/caminoNavegacion/CaminoNavegacion'
import { BotonAgregar } from './components/boton/botonAgregar/BotonAgregar'

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarSection />
          <CaminoNavegacion />
          <div className='prueba'>
            <BotonAgregar />
            <Buscador />
            <TablaEmisores />
        </div>
      </div>
    </Router>
  );
}

export default App;
