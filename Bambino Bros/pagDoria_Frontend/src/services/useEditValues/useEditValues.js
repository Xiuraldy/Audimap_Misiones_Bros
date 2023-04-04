import { useState } from "react";
import { REACT_APP_API_URL } from "../../utils/constanst";

export const useEditValues = (cb, request) => {
    const [error, setError] = useState('')
    const clearError = () => setError('')
    const validatorEditValues = () => {
        console.log('request.notes', request.notes)
        if(!request.notes){
            setError("Ingresa el link del plan de auditoría")
            console.log('error', error)
            return false
        }
        return true
    }
    const sendRequestValues = (column, id) => {
        console.log('request --->', request)
        console.log('id --->', id)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(request),
            redirect: 'follow'
          };

          fetch(`${REACT_APP_API_URL}/api/${column}/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.error){
                    throw new Error(result.error)
                }
                cb()
            })
            .catch(error => {
                setError(error.message)
            }); 
    }   
    return {sendRequestValues, error, clearError, validatorEditValues}
}