import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { useGetLinks } from '../useGetLinks/useGetLinks';

export const useSendEmailSurvey = (request) => {

    const [error, setError] = useState("")
    const clearError = () => setError('')
    const validatorSendEmail = () => {
        if(!request.auditedEmails){
            setError("Ingresa los correos de tus auditados")
            console.log('error', error)
            return false
        }
        return true
    }

    const {getAllLinks, links} = useGetLinks() // Trae los links
    useEffect(() => {
        // eslint-disable-next-line
        getAllLinks()
    }, [])

    const sendEmailSurvey = () => {
        console.log("entre")
        emailjs.send("service_c03913q","template_wnuhfto",{
            user_name: request.name,
            user_email: request.email,
            user_area: request.area,
            audited_emails: request.auditedEmails,
            link_survey: links.encuesta
        }, 'l7_wHwp6T2Mnin8T6')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    } 
    return{sendEmailSurvey, error, clearError, validatorSendEmail}

}