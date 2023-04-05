import React, { useState, useEffect } from "react";

const InfoBox = ({ text, speed, onInfoComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDialogueFinish, setDialogueFinish] = useState(false);
  useEffect(() => {
    let index = -1; // -1 For take first caracter
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        // -1 for counter open interval
        index++;
        setDisplayedText((prevText) => prevText + text[index]);
      } else {
        setDialogueFinish(true);
        clearInterval(interval);
      }
    }, 1000 / speed); // 1000/speed = 1 second

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (isDialogueFinish) {
      onInfoComplete(true);
    }
  }, [isDialogueFinish, onInfoComplete]);
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        wordWrap: "break-word",
        textAlign: "justify",
      }}
    >
      {displayedText}
    </div>
  );
};

export default InfoBox;
