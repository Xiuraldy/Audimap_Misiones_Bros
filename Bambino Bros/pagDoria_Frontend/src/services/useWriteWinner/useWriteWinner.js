import { useState } from "react";

export const useWriteWinner = (textWinner) => {
    let i = 0;
    let intervalTextMission = ""
    const [contentTextWinner, setContentTextWinner] = useState("")
    function writeWinner() {
    if (i < textWinner.length) {
        setContentTextWinner(intervalTextMission += textWinner.charAt(i))
        i++;
        setTimeout(writeWinner, 50); // La velocidad de escritura, 50 milisegundos.
        }
    }
    return {contentTextWinner, writeWinner, textWinner}
}