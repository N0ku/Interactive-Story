import { useEffect, useState } from "react";

export const useControls = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false
    });

    useEffect(() => {
        const keys = {
            KeyW: "forward",
            KeyS: "backward",
            KeyA: "left",
            KeyD: "right",
            ShiftLeft: "shift"
        };
        const findKey = (key) => keys[key];

        const handleKeyDown = (e) => {
            setInput((prevState) => ({ ...prevState, [findKey(e.code)]: true }));
        };
        const handleKeyUp = (e) => {
            setInput((prevState) => ({ ...prevState, [findKey(e.code)]: false }));
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []); // <-- add an empty dependency array here

    return input;
};
