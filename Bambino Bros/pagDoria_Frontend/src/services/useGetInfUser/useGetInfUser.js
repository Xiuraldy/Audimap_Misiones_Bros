import { useState } from 'react';
import { REACT_APP_API_URL } from '../../utils/constanst';

export const useGetInfUser = () => {

    const [infUser, setInfUser] = useState({})
    const [nevel, setNevel] = useState("")
    const [notes, setNotes] = useState("")
    const [notesThree, setNotesThree] = useState("")
    const [notesEight, setNotesEight] = useState("")

    const getInfUser = (id) => {
        fetch(`${REACT_APP_API_URL}/api/inf/user/${id}`)
        .then(response => response.json())
        .then(result => {
            if(result.error){
                throw new Error(result.error)
            }
            setInfUser(result)
            setNevel(result.nevel)
            setNotes(result.missionTwo)
            setNotesThree(result.missionThree)
            setNotesEight(result.missionEight)
        })
        .catch(error => console.log('error', error));
    }
    return {getInfUser, nevel, setNotes, notes, setNotesThree, notesThree, setNotesEight, notesEight, infUser}
}