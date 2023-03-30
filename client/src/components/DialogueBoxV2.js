import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const DialogueBox = ({ text, speed, delay, onComplete, className }) => {
  const dialogueBoxRef = useRef();
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = -1; // -1 For take first caracter
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        // -1 for counter open interval
        index++;
        setDisplayedText((prevText) => prevText + text[index]);
      } else {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, 1000 / speed); // 1000/speed = 1 second

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedText("");
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      ref={dialogueBoxRef}
      className={className}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        width: "500px",
        wordWrap: "break-word",
        textAlign: "justify",
      }}
    >
      {displayedText}
    </div>
  );
};

export default DialogueBox;
