import { useState } from "react";
import { REACT_APP_API_URL } from "../../utils/constanst";

export const useEditLinks = (cb, request) => {
    const [error, setError] = useState('')
    const sendRequestEdit = () => {
        console.log('request --->', request)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(request),
            redirect: 'follow'
          };
          
          fetch(`${REACT_APP_API_URL}/api/put/links`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log('result --->', result)
                if(result.error){
                    throw new Error(result.error)
                }
                console.log('result --->', result)
                cb()
            })
            .catch(error => {
                setError(error.message)
            }); 
    }   
    return {sendRequestEdit, error}
}