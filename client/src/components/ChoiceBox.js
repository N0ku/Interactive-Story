import React, { useState } from "react";

const ChoiceBox = ({ choices, onChoiceSelected }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    onChoiceSelected(choice);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    >
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => handleChoiceClick(choice)}
          disabled={selectedChoice !== null}
          style={{
            padding: "10px",
            margin: "5px",
            backgroundColor: "#333",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default ChoiceBox;
