import './CommonsMissionSeven.css' 
import { useContext, useEffect, useState } from 'react';
import { Button, MenuItem, Modal, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import { motion } from "framer-motion"
import { GlobalContext } from '../../../state/GlobalState';
import { useEditNevel } from '../../../services/useEditNevel/useEditNevel';
import { useWriteObject } from '../../../services/useWriteText/useWriteText';
import { useGetInfUser } from '../../../services/useGetInfUser/useGetInfUser';
import { useWriteWinner } from '../../../services/useWriteWinner/useWriteWinner';
import { useGetLinks } from '../../../services/useGetLinks/useGetLinks';
import { Alert, TableHead } from '@mui/material';
import { useSendEmail } from '../../../services/useSendEmail/useSendEmail';
import { Stack } from 'react-bootstrap';
import imgx from '../../../assets/icon/x.png'
import imgcursor from '../../../assets/icon/cursor.gif'
import imgobject from '../../../assets/background/object.gif'
import imgemail from '../../../assets/icon/email.png'
import imgmushroom from '../../../assets/icon/email.png'
import audioSeven from '../../../assets/audio/missionSeven.m4a'
import audiowin from '../../../assets/audio/winner.mp3' 

export const CommonsMissionSeven = () => {
    // eslint-disable-next-line
    const {user} = useContext(GlobalContext) //Trae Usuario
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        // console.log('user', user)
        setId(user ? user.id : '') //Almacena el Id
        setName(user ? user.name : '')
        setEmail(user ? user.email : '')
    },[user])

    const {getInfUser, nevel} = useGetInfUser()
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
    const {contentTextMission, writeObject} = useWriteObject("Compartan los resultados a los auditados a través de un correo electrónico.")
    const {contentTextWinner, writeWinner} = useWriteWinner("Felicidades, has logrado completar tu misión, estás cada vez más cerca de terminar tu aventura.")
    
    const audio = new Audio(audioSeven); //Audio del Objetivo

    //Botón Objetivo
    const viewObject = () => {
        onModalObject() 
        writeObject() //Efecto escritura
        audio.play() //Reproduce el audio
    }
    
    //Llama Función que contiene el "Fetch" que Actualiza Nivel
    const {sendRequestEdit, error:errorEdit} = useEditNevel(() => {
        
    }, {nevel: nevel < 7 ? 7 : nevel}) 

    const {getAllLinks, links} = useGetLinks() // Trae los links
    useEffect(() => {
        // eslint-disable-next-line
        getAllLinks()
    }, [])

    const [auditedEmails, setAuditedEmails] = useState("")
    const [positiveAspects, setPositiveAspects] = useState("")
    const [improvementOpportunities, setImprovementOpportunities] = useState("")
    const [finding, setFinding] = useState("")
    const [qualification, setQualification] = useState("")
    
    const {sendEmail, error: errorSendEmail, clearError, validatorSendEmail} = useSendEmail({
        name: name, email: email, auditedEmails: auditedEmails, positiveAspects: positiveAspects, 
        improvementOpportunities: improvementOpportunities, finding: finding, qualification: qualification
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
        nevel < 7 && sendRequestEdit(id)
        onModalCompleted()
        writeWinner()
        audioWinner.play()
        sendEmail()
    }

    const redirectLink = () => {
        window.open(links.listaChequeo)
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
            <button className='send-mission'>{nevel >= 7 ? 'Misión Completada' : 'Misión Pendiente'}</button>
            <div className="content-mission">
                <div className="tasks">
                    <div className="program-meet" name="missionSeven">
                        <h1 className='link-calendar' name="missionSeven" onClick={() => redirectLink()}>Link de la lista de chequeo<img src={ imgcursor } className='cursor-gif' /></h1>
                        <div className="from">
                            <img src={ imgemail } className='email-image' />
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
                        <div className="table-results">
                            <TableContainer component={Paper}>
                                <Table sx={{ width: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Aspectos positivos</TableCell>
                                        <TableCell>Oportunidades de mejora</TableCell>
                                        <TableCell>Hecho / Hallazgo</TableCell>
                                        <TableCell>Calificación</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                        <TableCell>
                                            <TextField 
                                                multiline 
                                                onChange={(e) => setPositiveAspects(e.target.value)}
                                                value={positiveAspects} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                multiline 
                                                onChange={(e) => setImprovementOpportunities(e.target.value)}
                                                value={improvementOpportunities} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                multiline 
                                                onChange={(e) => setFinding(e.target.value)}
                                                value={finding} 
                                            />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Select 
                                                onChange={(e) => setQualification(e.target.value)}
                                                value={qualification} 
                                                className='select-table'
                                            >
                                                <MenuItem value="NC">NC</MenuItem>
                                                <MenuItem value="O">O</MenuItem>
                                            </Select>
                                        </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                            <Button onClick={() => completedMission()} variant="contained" className='button-send-email'>Enviar Correo<img src={ imgmushroom } className='mushroom-gif'/></Button>
                    </div>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={!!errorSendEmail} autoHideDuration={5000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%'}}>
                                    <p>{errorSendEmail}</p>
                                </Alert>
                        </Snackbar>
                    </Stack>
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
    </>
    )
}