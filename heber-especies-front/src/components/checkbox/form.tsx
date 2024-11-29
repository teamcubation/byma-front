import React, { useState } from 'react';
import Checkbox from './checkbox';

const App: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false); // Estado para controlar el estado del checkbox

  return (
    <div>
      {/* Renderizar el checkbox con el estado pasado como prop */}
      <Checkbox isDisabled={isDisabled} />

      {/* Botón para alternar el estado de deshabilitación */}
      <button onClick={() => setIsDisabled(!isDisabled)}>
        {isDisabled ? 'Habilitar Checkbox' : 'Deshabilitar Checkbox'}
      </button>
    </div>
  );
};

export default App;
