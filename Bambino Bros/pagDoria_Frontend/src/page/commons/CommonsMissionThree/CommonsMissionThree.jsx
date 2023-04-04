import './CommonsMissionThree.css' 
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Snackbar } from '@material-ui/core';
import { motion } from "framer-motion"
import { GlobalContext } from '../../../state/GlobalState';
import { useEditNevel } from '../../../services/useEditNevel/useEditNevel';
import { useWriteObject } from '../../../services/useWriteText/useWriteText';
import { useGetInfUser } from '../../../services/useGetInfUser/useGetInfUser';
import { useWriteWinner } from '../../../services/useWriteWinner/useWriteWinner';
import { useGetLinks } from '../../../services/useGetLinks/useGetLinks';
import { Stack } from '@mui/system';
import { Alert } from '@mui/material';
import { useEditValues } from '../../../services/useEditValues/useEditValues';
import imgx from '../../../assets/icon/x.png'
import imgcursor from '../../../assets/icon/cursor.gif'
import imgobject from '../../../assets/background/object.gif'
import audioThree from '../../../assets/audio/missionThree.m4a'
import audiowin from '../../../assets/audio/winner.mp3' 

export const CommonsMissionThree = () => {
    // eslint-disable-next-line
    const {user} = useContext(GlobalContext) //Trae Usuario
    const [id, setId] = useState()

    useEffect(() => {
        // console.log('user', user)
        setId(user ? user.id : '') //Almacena el Id
    },[user])

    const {getInfUser, nevel, setNotesThree, notesThree} = useGetInfUser()
    useEffect(() => {
        // console.log("id", id)
        if(id){
            getInfUser(id) 
        }
        // eslint-disable-next-line
    }, [id])
    
    // console.log("nevel", nevel)

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
    const {contentTextMission, writeObject} = useWriteObject("Elaboren el plan de auditoría.")
    //Imprime mensaje de victoria con efecto escritura
    const {contentTextWinner, writeWinner} = useWriteWinner("Felicidades, has logrado completar tu misión, estás cada vez más cerca de terminar tu aventura.")
    
    const audio = new Audio(audioThree); //Audio del Objetivo

    //Botón Objetivo
    const viewObject = () => {
        audio.play() //Reproduce el audio
        onModalObject() 
        writeObject() //Efecto escritura
    }
    
    //Llama Función que contiene el "Fetch" que Actualiza Nivel
    const {sendRequestEdit, error:errorEdit} = useEditNevel(() => {
        
    }, {nevel: nevel < 3 ? 3 : nevel}) 
    
    const {getAllLinks, links} = useGetLinks() // Trae los links
    useEffect(() => {
        // eslint-disable-next-line
        getAllLinks()
    }, [])

    //const [open, setOpen] = React.useState(false); //Abrir error

    const {sendRequestValues, error: errorEditValues, clearError, validatorEditValues} = useEditValues(() => {
    }, {notes: notesThree}) 


    const audioWinner = new Audio(audiowin); //Audio del Objetivo
    //Programa Reunión
    const completedMission = () => {
        if(!validatorEditValues()){
            return
        }
        audioWinner.play()
        nevel < 3 && sendRequestEdit(id)
        sendRequestValues('missionThree', id)
        onModalCompleted()
        writeWinner()
    }

    const redirectLink = () => {
        window.open(links.programacionAuditorias)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        clearError()
    };

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
            <button className='send-mission'>{nevel >= 3 ? 'Misión Completada' : 'Misión Pendiente'}</button>
            <div className="content-mission">
                <div className="tasks" name="center">
                    <div className="program-meet">
                        <div className="text-principal">
                            <h1 className='link-calendar' name="missionThree" onClick={() => redirectLink()}>Conexión de programación de auditorías<img src={ imgcursor } className='cursor-gif' /></h1>
                            <div className="paste-link">
                                <h3 className='description-missionThree'>Ten en cuenta que este link te llevará a la programación de auditorías del año en curso, debes ir a opciones y crear plan de auditoría. Este plan deben enviarlo a aprobación al líder del proceso a auditar. Hazle una llamada para recordarle revisar y aprobar el plan de auditoría en Conexión.<br/><b>Pega el link de tu plan de auditoría creado, para consultarlo o editarlo, si es necesario</b></h3>
                                <textarea
                                    type="text" 
                                    placeholder='Link'
                                    className='notes-missionThree' 
                                    onChange={(e) => setNotesThree(e.target.value)} 
                                    value={notesThree}
                                />
                            </div>
                        </div>
                        <button className='button-completed-mission' onClick={() => completedMission()}>Completar Misión</button>
                    </div>
                </div>
            </div>
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
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={!!errorEditValues} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%'}}>
                            <p>{errorEditValues}</p>
                        </Alert>
                </Snackbar>
            </Stack>
    </>
    )
}