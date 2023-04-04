import './CommonsMissionNine.css' 
import { useContext, useEffect, useState } from 'react';
import { Box, Modal, TextField } from '@material-ui/core';
import { motion } from "framer-motion"
import { GlobalContext } from '../../../state/GlobalState';
import { useEditNevel } from '../../../services/useEditNevel/useEditNevel';
import { useWriteObject } from '../../../services/useWriteText/useWriteText';
import { useGetInfUser } from '../../../services/useGetInfUser/useGetInfUser';
import { useWriteWinner } from '../../../services/useWriteWinner/useWriteWinner';
import { useSendEmailSurvey } from '../../../services/useSendEmailSurvey/useSendEmailSurvey';
import { SUBROL } from '../../../utils/constanst';
import { Alert, Snackbar, Stack } from '@mui/material';
import imgx from '../../../assets/icon/x.png'
import imgcursor from '../../../assets/icon/cursor.gif'
import imgobject from '../../../assets/background/object.gif'
import imgemail from '../../../assets/icon/email.png'
import audioNine from '../../../assets/audio/missionNine.m4a'
import audiowin from '../../../assets/audio/winner.mp3' 

export const CommonsMissionNine = () => {
    // eslint-disable-next-line
    const {user} = useContext(GlobalContext) //Trae Usuario
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [area, setArea] = useState()

    useEffect(() => {
        // console.log('user', user)
        setId(user ? user.id : '') //Almacena el Id
        setName(user ? user.name : '') //Almacena el Nombre
        setEmail(user ? user.email : '') //Almacena el email
        setArea(user ? user.subrol : '') //Almacena el Area
    },[user])

    const {getInfUser, nevel} = useGetInfUser()
    useEffect(() => {
        // console.log("id", id)
        if(id){
            getInfUser(id) 
        }
        // eslint-disable-next-line
    }, [id])
    
    console.log("nevel", nevel)

    //Modal De Misión Completada (Abrir y Cerrar)
    const [modalCompleted, setModalCompleted] = useState(false);
    const onModalCompleted = () => {
        setModalCompleted(!modalCompleted)
    }

    //Modal Del Objetivo (Abrir y Cerrar)
    const [modalObject, setModalObject] = useState(false);
    const onModalObject = () => {
        setModalObject(!modalObject)
    }

    //Imprime objetivo con efecto escritura
    const {contentTextMission, writeObject} = useWriteObject("¿Qué tal estuvo la experiencia? Envíen el formulario de encuesta de satisfacción a sus auditados.")
    const {contentTextWinner, writeWinner} = useWriteWinner("Felicitaciones, has terminado tu aventura.")
    
    const audio = new Audio(audioNine); //Audio del Objetivo

    //Botón Objetivo
    const viewObject = () => {
        onModalObject() 
        writeObject() //Efecto escritura
        audio.play() //Reproduce el audio
    }
    
    //Llama Función que contiene el "Fetch" que Actualiza Nivel
    const {sendRequestEdit, error:errorEdit} = useEditNevel(() => {
        
    }, {nevel: nevel < 9 ? 9 : nevel}) 

    const [auditedEmails, setAuditedEmails] = useState("")
    
    const {sendEmailSurvey, error: errorSendEmail, clearError, validatorSendEmail} = useSendEmailSurvey({
        name: name, email: email, area: SUBROL[area], auditedEmails: auditedEmails
    })

    //Cierra mensaje de inputs vacios
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        clearError()
    };
    
    const audioWinner = new Audio(audiowin); //Audio del Objetivo
    //Programa Reunión
    const completedMission = () => {
        if(!validatorSendEmail()){
            return
        }
        nevel < 9 && sendRequestEdit(id)
        onModalCompleted()
        writeWinner()
        audioWinner.play()
        sendEmailSurvey()
    }

    

    // eslint-disable-next-line
    { errorEdit && (<div className="message-bad" id="message-bad">
        <hr />
        <h3>Surgió un error</h3>
        <p>{errorEdit}</p>
        <img className="img-error" src={ imgx } alt="Error" />
    </div>) }
    
    return (
        <>
            <button onClick={() => viewObject()} className='button-send' name='object-mission'>Objetivo</button>
            <button className='send-mission'>{nevel >= 9 ? 'Misión Completada' : 'Misión Pendiente'}</button>
            <div className="content-mission">
                <div className="tasks">
                    <div className="from" name="missionNine">
                        <img src= {imgemail} className='email-image' />
                        <div className="text-from">
                            <h4>Ingrese los Correos de los Auditados:</h4>
                            <h6>(Separados por comas)</h6>
                        </div>
                        <TextField
                            multiline
                            className='audited-emails'  
                            onChange={(e) => setAuditedEmails(e.target.value)}
                            value={auditedEmails} 
                        />
                    </div>
                    <div className="program-meet">
                        <h1 className='link-calendar' onClick={() => completedMission()}>Enviar Correo<img src={ imgcursor } className='cursor-gif' /></h1>
                    </div>
                </div>
            </div>

                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={!!errorSendEmail} autoHideDuration={5000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{  }}>
                                <p>{errorSendEmail}</p>
                            </Alert>
                    </Snackbar>
                </Stack>

            {/* Modal Del Objetivo */}
            <Modal
            open={modalObject}
            onClose={onModalObject}>
                {
                    <motion.div
                        className="container"
                        initial={{ scale: .5, y:200, rotate:80 }}
                        animate={{ rotate:0, scale: 1 }}
                        transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}>                     
                        <div className='modal' name="object">
                            <p>{contentTextMission}</p>
                            <img src={ imgobject } alt="Audimap" className="logo-footer"/>
                        </div>
                    </motion.div>
                }
            </Modal>
            {/* Modal De Misión Completada */}
            <Modal
            open={modalCompleted}
            onClose={onModalCompleted}>
                {
                    <motion.div
                        className="container"
                        initial={{ scale: .5, y:200, rotate:80 }}
                        animate={{ rotate:0, scale: 1 }}
                        transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}>                     
                        <div className='modal' name="completed">
                            <p>{contentTextWinner}</p>
                        </div>
                    </motion.div>
                }
            </Modal>
    </>
    )
}