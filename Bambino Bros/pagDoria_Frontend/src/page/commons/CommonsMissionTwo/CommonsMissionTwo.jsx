import './CommonsMissionTwo.css' 
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Snackbar } from '@material-ui/core';
import { motion } from "framer-motion"
import { GlobalContext } from '../../../state/GlobalState';
import { useEditNevel } from '../../../services/useEditNevel/useEditNevel';
import { useGetInfUser } from '../../../services/useGetInfUser/useGetInfUser';
import { useEditValues } from '../../../services/useEditValues/useEditValues';
import { useWriteObject } from '../../../services/useWriteText/useWriteText';
import { Alert, Stack } from '@mui/material';
import { useGetLinks } from '../../../services/useGetLinks/useGetLinks';
import { useWriteWinner } from '../../../services/useWriteWinner/useWriteWinner';
import imgx from '../../../assets/icon/x.png'
import imgobject from '../../../assets/background/object.gif'
import imgmap from "../../../assets/icon/missionTwo/map.png"
import imgpolitic from "../../../assets/icon/missionTwo/politic.png"
import imgrisk from "../../../assets/icon/missionTwo/risk.png"
import imgrisk2 from "../../../assets/icon/missionTwo/risk2.png"
import imgresults from "../../../assets/icon/missionTwo/results.png"
import imgpendings from "../../../assets/icon/missionTwo/pending.png"
import imgcompleted from "../../../assets/icon/missionTwo/completed.png"
import audioTwo from '../../../assets/audio/missionTwo.m4a'

export const CommonsMissionTwo = () => {
    // eslint-disable-next-line
    const {user, setUser} = useContext(GlobalContext) //Trae Usuario
    const [id, setId] = useState()
    const [subrol, setSubrol] = useState("")

    useEffect(() => {
        // console.log('user', user)
        setId(user ? user.id : '') //Almacena el Id
        setSubrol(user ? user.subrol : "") //Almacena el subrol
    },[user])

    //Determinar si un check es verdadero o falso
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);
    const [isChecked6, setIsChecked6] = useState(false);
    const [isChecked7, setIsChecked7] = useState(false);
    const [isChecked8, setIsChecked8] = useState(false);
    const [isChecked9, setIsChecked9] = useState(false);

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

    const {contentTextMission, writeObject} = useWriteObject("Prepárense, estudien el proceso que van a auditar.")
    //Imprime mensaje de victoria con efecto escritura
    const {contentTextWinner, writeWinner} = useWriteWinner("Felicidades, has logrado completar tu misión, estás cada vez más cerca de terminar tu aventura.")
    
    const audio = new Audio(audioTwo); //Audio del Objetivo

    //Botón Objetivo
    const viewObject = () => {
        onModalObject() 
        writeObject() //Efecto escritura
        audio.play() //Reproduce el audio
    }

    const completedMissionTwo = () => {
        if(id){
            nevel < 2 && sendRequestEdit(id) //Actualiza el nivel
        }
        saveNotes() //Almacena las notas
        onModalCompleted()
        writeWinner() //Actualiza la página
    }

    //Mensaje "Notas Guardadas"
    const [openMessageLinks, setOpenMessageLinks] = React.useState(false);
    const handleCloseMessageLinks = (event, reason) => {
        setOpenMessageLinks(false) // Cierr mensaje de notas guardadas
    }
    
    const {getInfUser, nevel, setNotes, notes} = useGetInfUser()
    useEffect(() => {
        if(id){
            getInfUser(id) 
        }
        // eslint-disable-next-line
    }, [id])
    console.log("nevel", nevel)
    
    //Llama Función que contiene el "Fetch" que Crea o Actualiza Las Notas
    const {sendRequestValues, error: errorEditValues} = useEditValues(() => {
    }, {notes}) 

    const saveNotes = () => {
        sendRequestValues('missionTwo', id)
        setOpenMessageLinks(true) // Abre mensaje de notas guardadas
    }
    
    //Llama Función que contiene el "Fetch" que Actualiza Nivel
    const {sendRequestEdit, error:errorEdit} = useEditNevel(() => {
    }, {nevel: nevel < 2 ? 2 : nevel}) 

    //Asignar nombre de la columna por cada area
    const AREA_AUDITOR = {
        pastificio: 'areaPastificio',
        business: 'areaNegocio',
        marketing: 'areaMercadeo',
        quality: 'areaCalidad',
        environmental: 'areaAmbiental',
        investigation: 'areaInvestigacion',
        engineering: 'areaIngenieria',
        control: 'areaControl',
        human: 'areaHumana',
        sales: 'areaVentas',
        sst: 'areaSST',
        planning: 'areaPlaneacion',
        administrative: 'areaServicios'
    }

    const {getAllLinks, links} = useGetLinks() //Trae los links
    useEffect(() => {
        // eslint-disable-next-line
        getAllLinks()
    }, [])
    //Ingresa a los Links
    const redirectLinkClass = (point, nameLink) => {
        const isCheckedFunctions = [setIsChecked1, setIsChecked2, setIsChecked3, setIsChecked4, setIsChecked5, setIsChecked6, setIsChecked7, setIsChecked8, setIsChecked9]; //Primero se crea un arreglo llamado "isCheckedFunctions" que contiene las cuatro funciones "setIsChecked" correspondientes a los valores. 
        if (point >= 1 && point <= 11) { //Luego, se evalúa si el valor de "point" está entre los valores (ambos inclusive) utilizando la condición
            isCheckedFunctions[point - 1](true); //Si esta condición es verdadera, se accede al índice correspondiente al valor de "point" en el arreglo "isCheckedFunctions" restando 1 del valor de "point"
        }

        // console.log("user.subrol", )
        // console.log("nameLink", nameLink)
        // console.log("AREA_AUDITOR[nameLink]", AREA_AUDITOR[user ? user.subrol : ""])
        if(nameLink === "resultadosAuditoria") {
            console.log('subrol', subrol)
            if(subrol === "logistics"){
                window.open(links['areaLogistica'])
                window.open(links['areaLogistica2'])
            }else {
                window.open(links[AREA_AUDITOR[subrol]])
            }
        }else {
            // console.log("entre")
            window.open(links[nameLink])
        }
    }

    // -- Errores --

    // eslint-disable-next-line
    { errorEdit && (<div className="message-bad" id="message-bad">
        <hr />
        <h3>Surgió un error</h3>
        <p>{errorEdit}</p>
        <img className="img-error" src={ imgx } alt="Error" />
    </div>) }

    // eslint-disable-next-line
    { errorEditValues && (<div className="message-bad" id="message-bad">
        <hr />
        <h3>Surgió un error</h3>
        <p>{errorEditValues}</p>
        <img className="img-error" src={ imgx } alt="Error" />
    </div>) }

    return (
        <>
            <button onClick={() => viewObject()} className='button-send' name='object-mission'>Objetivo</button>
            <button className='send-mission'>{nevel >= 2 ? 'Misión Completada' : 'Misión Pendiente'}</button> 
            <div className="content-mission">
                <div className="square-notes">
                    <textarea
                        type="text" 
                        placeholder='Notas'
                        className='notes-missionTwo' 
                        onChange={(e) => setNotes(e.target.value)} 
                        value={notes}
                    />
                    <h5>Querido Auditor, acá puedes anotar tus comentarios respecto a la documentación revisada.</h5>

                    { nevel >= 2 &&
                        <Button variant="contained" color="success" onClick={() => saveNotes()}>Guardar Mis Notas</Button>
                    }
                </div>
                <div className="tasks" name="missionTwo">
                    <div className="class-links" name={`${isChecked1}`} onClick={() => redirectLinkClass(1, "mapaDeValor")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Mapa de Valor 2030</h1><img src={imgmap} alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked1}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked2}`} onClick={() => redirectLinkClass(2, "politicaIntegral")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Política Integral</h1><img src={ imgpolitic } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked2}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked3}`} onClick={() => redirectLinkClass(3, "riesgos")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Riesgos Estratégicos, Tácticos y Operativos</h1><img src={ imgrisk } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked3}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked4}`} onClick={() => redirectLinkClass(4, "matrizRiesgos")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Consulta la matriz de riesgos de SST</h1><img src={ imgrisk2 } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked4}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked5}`} onClick={() => redirectLinkClass(5, "resultadosAuditoria")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Resultados de auditoría interna anterior</h1><img src={ imgresults } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked5}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked6}`} onClick={() => redirectLinkClass(6, "icontec")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Resultado auditorias externas anteriores (ICONTEC)</h1><img src={ imgresults } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked6}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked7}`} onClick={() => redirectLinkClass(7, "basc")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Resultado auditorias externas anteriores (BASC)</h1><img src={ imgresults } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked7}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked8}`} onClick={() => redirectLinkClass(8, "fssc")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Resultado auditorias externas anteriores (FSSC)</h1><img src={ imgresults } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked8}
                        />
                    </div>
                    <div className="class-links" name={`${isChecked9}`} onClick={() => redirectLinkClass(9, "accionesPendientes")}>
                        <div className="title-img-links">
                            <h1 className='link-class'>Consulta las acciones pendientes del proceso</h1><img src={ imgpendings } alt="" />
                        </div>
                        <input
                            disabled
                            hidden
                            type="checkbox"
                            className='checkbox-exit'
                            name="missionTwo"
                            value="Paneer"
                            checked={isChecked9}
                        />
                    </div>
                    {nevel < 2 && isChecked1 === true && isChecked2 === true && isChecked3 === true && isChecked4 === true && isChecked5 === true && isChecked6 === true && isChecked7 === true && isChecked8 === true && isChecked9  ? 
                        <div className="class-links" name="mission-completed" onClick={() => completedMissionTwo()}>
                            <div className="title-img-links">
                                <h1 className='link-class'>Completar<br/>Misión</h1><img src={ imgcompleted } alt="" />
                            </div>
                        </div>
                        : ""
                    }
                </div>
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openMessageLinks} autoHideDuration={6000} onClose={handleCloseMessageLinks}>
                        <Alert onClose={handleCloseMessageLinks} severity="success" sx={{  width: '100%', marginTop: '180px', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                            Notas Guardadas Con Exito
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