import React, { useState } from "react";
import RadioButton from "./RadioButton";

const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <h1>Selecciona una opción:</h1>
      <div className="radio-buttons-group">
        <RadioButton
          id="option1"
          name="group1"
          label="Opción 1"
          checked={selectedOption === "option1"}
          onChange={handleRadioChange}
        />
        <RadioButton
          id="option2"
          name="group1"
          checked={selectedOption === "option2"}
          onChange={handleRadioChange}
        />
        <RadioButton
          id="option3"
          name="group1"
          checked={selectedOption === "option3"}
          onChange={handleRadioChange}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default App;
