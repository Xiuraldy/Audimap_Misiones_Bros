import { useState } from "react";

export const useWriteObject = (textObject) => {
        let i = 0;
        let intervalTextMission = ""
        const [contentTextMission, setContentTextMission] = useState("")
        function writeObject() {
            console.log("textObject", textObject)
        if (i < textObject.length) {
            setContentTextMission(intervalTextMission += textObject.charAt(i))
            i++;
            setTimeout(writeObject, 50); // La velocidad de escritura, 50 milisegundos.
        }
    }
    return {contentTextMission, writeObject, textObject}
}