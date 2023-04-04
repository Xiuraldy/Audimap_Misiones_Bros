import { useState } from 'react';
import { REACT_APP_API_URL } from '../../utils/constanst';

export const useGetLinks = () => {
    const [links, setLinks] = useState("")

    const getAllLinks = () => {
        fetch(`${REACT_APP_API_URL}/api/get/links`)
        .then(response => response.json())
        .then(result => {
            if(result.error){
                throw new Error(result.error)
            }
            // console.log("result", result.nevel)
            setLinks(result.nevel)
        })
        .catch(error => console.log('error', error));
    }
    return {getAllLinks, links}
}