import emailjs from '@emailjs/browser';
import { useState } from 'react';

export const useSendEmail = (request) => {

    const [error, setError] = useState("")
    const clearError = () => setError('')
    const validatorSendEmail = () => {
        console.log('request.notes', request.name)
        if(!request.name || !request.email || !request.auditedEmails || !request.positiveAspects || !request.improvementOpportunities || !request.finding || !request.qualification){
            setError("Ingresa todos los espacios de tu correo")
            console.log('error', error)
            return false
        }
        return true
    }

    const sendEmail = () => {
        emailjs.send("service_c03913q","template_3grhhhb",{
            user_name: request.name,
            user_email: request.email,
            audited_emails: request.auditedEmails,
            positive_aspects: request.positiveAspects,
            improvement_opportunities: request.improvementOpportunities,
            finding: request.finding,
            qualification: request.qualification
        }, 'l7_wHwp6T2Mnin8T6')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    } 
    return{sendEmail, error, clearError, validatorSendEmail}
}