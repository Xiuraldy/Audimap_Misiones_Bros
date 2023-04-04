import './CommonsMissionOne.css' 
import { useContext, useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { motion } from "framer-motion"
import { GlobalContext } from '../../../state/GlobalState';
import { useEditNevel } from '../../../services/useEditNevel/useEditNevel';
import { useWriteObject } from '../../../services/useWriteText/useWriteText';
import { useGetInfUser } from '../../../services/useGetInfUser/useGetInfUser';
import { useWriteWinner } from '../../../services/useWriteWinner/useWriteWinner';
import imgx from '../../../assets/icon/x.png'
import imgcursor from '../../../assets/icon/cursor.gif'
import imgobject from '../../../assets/background/object.gif'
import audioOne from '../../../assets/audio/missionOne.m4a'
import audiowin from '../../../assets/audio/winner.mp3' 

export const CommonsMissionOne = () => {
    // eslint-disable-next-line
    const {user} = useContext(GlobalContext) //Trae Usuario
    const [id, setId] = useState()

    useEffect(() => {
        // console.log('user', user)
        setId(user ? user.id : '') //Almacena el Id
    },[user])

    const {getInfUser, nevel} = useGetInfUser()
    useEffect(() => {
        // console.log("id", id)
        if(id){
            getInfUser(id) 
        }
        // eslint-disable-next-line
    }, [id])

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
    const {contentTextMission, writeObject} = useWriteObject("Líder: Cita a tu equipo de auditores para planificar el ejercicio de auditoría.")
    const {contentTextWinner, writeWinner} = useWriteWinner("Felicidades, has logrado completar tu misión, estás cada vez más cerca de terminar tu aventura.")
    
    const audio = new Audio(audioOne); //Audio del Objetivo

    //Botón Objetivo
    const viewObject = () => {
        onModalObject() 
        writeObject() //Efecto escritura
        audio.play() //Reproduce el audio
    }
    
    //Llama Función que contiene el "Fetch" que Actualiza Nivel
    const {sendRequestEdit, error:errorEdit} = useEditNevel(() => {
        
    }, {nevel: !nevel ? 1 : nevel}) 
    
    const audioWinner = new Audio(audiowin); //Audio del Objetivo
    //Programa Reunión
    const completedMission = () => {
        nevel < 1 && sendRequestEdit(id)
        onModalCompleted()
        writeWinner()
        audioWinner.play()
        window.open("https://calendar.google.com/calendar/u/0/r/week")
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
            <button className='send-mission'>{nevel >= 1 ? 'Misión Completada' : 'Misión Pendiente'}</button>
            <div className="content-mission">
                <div className="tasks" name="center">
                    <div className="program-meet">
                        <h1 className='link-calendar' onClick={() => completedMission()}>Programa aquí tu reunión<img src={ imgcursor } className='cursor-gif' /></h1>
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
                            <img src= { imgobject } alt="Audimap" className="logo-footer"/>
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