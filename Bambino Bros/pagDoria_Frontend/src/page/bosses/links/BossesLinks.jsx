import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import '.././styleBosses.css';
import './BossesLinks.css';
import { useEditUser } from '../../../services/useEditUser/useEditUser';
import { GlobalContext } from '../../../state/GlobalState';
import { useGetLinks } from '../../../services/useGetLinks/useGetLinks';
import { useEditLinks } from '../../../services/useEditLinks/useEditLinks';
import imgx from '../../../assets/icon/x.png' 
import { Stack } from 'react-bootstrap';
import { Alert } from '@mui/material';

export const BossesLinks = () => {

    const {getAllLinks, links} = useGetLinks() // Trae los links
    useEffect(() => {
        // eslint-disable-next-line
        getAllLinks()
    }, [])

    //Links
    const [mapaDeValor, setMapaDeValor] = useState('');
    const [politicaIntegral, setPoliticaIntegral] = useState('');
    const [riesgos, setRiesgos] = useState('');
    const [matrizRiesgos, setMatrizRiesgos] = useState('');
    const [areaLogistica, setAreaLogistica] = useState('');
    const [areaLogistica2, setAreaLogistica2] = useState('');
    const [areaPastificio, setAreaPastificio] = useState('');
    const [areaNegocio, setAreaNegocio] = useState('');
    const [areaMercadeo, setAreaMercadeo] = useState('');
    const [areaCalidad, setAreaCalidad] = useState('');
    const [areaAmbiental, setAreaAmbiental] = useState('');
    const [areaInvestigacion, setAreaInvestigacion] = useState('');
    const [areaIngenieria, setAreaIngenieria] = useState('');
    const [areaControl, setAreaControl] = useState('');
    const [areaHumana, setAreaHumana] = useState('');
    const [areaVentas, setAreaVentas] = useState('');
    const [areaSST, setAreaSST] = useState('');
    const [areaPlaneacion, setAreaPlaneacion] = useState('');
    const [areaServicios, setAreaServicios] = useState('');
    const [icontec, setIcontec] = useState('');
    const [basc, setBasc] = useState('');
    const [fssc, setFssc] = useState('');
    const [accionesPendientes, setAccionesPendientes] = useState('');
    const [programacionAuditorias, setProgramacionAuditorias] = useState('');
    const [areaAuditar, setAreaAuditar] = useState('');
    const [listaChequeo, setListaChequeo] = useState('');
    const [encuesta, setEncuesta] = useState('');

    const [rol, setRol] = useState('')
    // eslint-disable-next-line
    const {user, setUser} = useContext(GlobalContext)

    //Mensaje de Links Guardados con exito
    const [openMessageLinks, setOpenMessageLinks] = React.useState(false);
    const handleCloseMessageLinks = (event, reason) => {
        setOpenMessageLinks(false)
    }

    //Asigna el valor de la bd a los links
    useEffect(() => {
        setMapaDeValor(links.mapaDeValor)
        setPoliticaIntegral(links.politicaIntegral)
        setRiesgos(links.riesgos)
        setMatrizRiesgos(links.matrizRiesgos)
        setAreaLogistica(links.areaLogistica)
        setAreaLogistica2(links.areaLogistica2)
        setAreaPastificio(links.areaPastificio)
        setAreaNegocio(links.areaNegocio)
        setAreaMercadeo(links.areaMercadeo)
        setAreaCalidad(links.areaCalidad)
        setAreaAmbiental(links.areaAmbiental)
        setAreaInvestigacion(links.areaInvestigacion)
        setAreaIngenieria(links.areaIngenieria)
        setAreaControl(links.areaControl)
        setAreaHumana(links.areaHumana)
        setAreaVentas(links.areaVentas)
        setAreaSST(links.areaSST)
        setAreaPlaneacion(links.areaPlaneacion)
        setAreaServicios(links.areaServicios)
        setIcontec(links.icontec)
        setBasc(links.basc)
        setFssc(links.fssc)
        setAccionesPendientes(links.accionesPendientes)
        setProgramacionAuditorias(links.programacionAuditorias)
        setAreaAuditar(links.areaAuditar)
        setListaChequeo(links.listaChequeo)
        setEncuesta(links.encuesta)
    }, [links])
    
    const upploadLinks = () => {
        sendRequestEdit()
    }

    console.log("mapaDeValor", mapaDeValor)

    //Actualizar los links
    const {sendRequestEdit, error:errorEdit} = useEditLinks(() => {
        setOpenMessageLinks(true)
    }, {mapaDeValor, politicaIntegral, riesgos, matrizRiesgos, areaLogistica, areaLogistica2, areaPastificio, areaNegocio, areaMercadeo, areaCalidad, areaAmbiental, areaInvestigacion, areaIngenieria, areaControl, areaHumana, areaVentas, areaSST, areaPlaneacion, areaServicios, icontec, basc, fssc, accionesPendientes, programacionAuditorias, areaAuditar, listaChequeo, encuesta})
    
    useEffect(() => {
        setRol(user ? user.rol : '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
      
    return (
        <div className='main-bosses-user'>
                <div className='modal-title' name="links">
                    <h2>Actualizar</h2>
                </div>
                <div className="inputs-links">
                    <TextField 
                        className='link'
                        label="Mapa de Valor" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="mapaDeValor"
                        onChange={(e) => setMapaDeValor(e.target.value)} 
                        value={mapaDeValor}
                    />

                    <TextField 
                        className='link'
                        label="Política Integral" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="politicaIntegral"
                        onChange={(e) => setPoliticaIntegral(e.target.value)} 
                        value={politicaIntegral}
                    />

                    <TextField 
                        className='link'
                        label="Riesgos" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="riesgos"
                        onChange={(e) => setRiesgos(e.target.value)} 
                        value={riesgos}
                    />

                    <TextField 
                        className='link'
                        label="Matriz de Riesgos" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="matrizRiesgos"
                        onChange={(e) => setMatrizRiesgos(e.target.value)} 
                        value={matrizRiesgos}
                    />

                    <TextField 
                        className='link'
                        label="Área Logística" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaLogistica"
                        onChange={(e) => setAreaLogistica(e.target.value)} 
                        value={areaLogistica}
                    />

                    <TextField 
                        className='link'
                        label="Área Logística" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaLogistica2"
                        onChange={(e) => setAreaLogistica2(e.target.value)} 
                        value={areaLogistica2}
                    />

                    <TextField 
                        className='link'
                        label="Área Pastificio" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaPastificio"
                        onChange={(e) => setAreaPastificio(e.target.value)} 
                        value={areaPastificio}
                    />

                    <TextField 
                        className='link'
                        label="Área Negocio" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaNegocio"
                        onChange={(e) => setAreaNegocio(e.target.value)} 
                        value={areaNegocio}
                    />

                    <TextField 
                        className='link'
                        label="Área Mercadeo" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaMercadeo"
                        onChange={(e) => setAreaMercadeo(e.target.value)} 
                        value={areaMercadeo}
                    />

                    <TextField 
                        className='link'
                        label="Área Calidad" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaCalidad"
                        onChange={(e) => setAreaCalidad(e.target.value)} 
                        value={areaCalidad}
                    />

                    <TextField 
                        className='link'
                        label="Área Ambiental" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaAmbiental"
                        onChange={(e) => setAreaAmbiental(e.target.value)} 
                        value={areaAmbiental}
                    />

                    <TextField 
                        className='link'
                        label="Área Investigación" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaInvestigacion"
                        onChange={(e) => setAreaInvestigacion(e.target.value)} 
                        value={areaInvestigacion}
                    />

                    <TextField 
                        className='link'
                        label="Área Ingeniería" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaIngenieria"
                        onChange={(e) => setAreaIngenieria(e.target.value)} 
                        value={areaIngenieria}
                    />

                    <TextField 
                        className='link'
                        label="Área Control" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaControl"
                        onChange={(e) => setAreaControl(e.target.value)} 
                        value={areaControl}
                    />

                    <TextField 
                        className='link'
                        label="Área Humana" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaHumana"
                        onChange={(e) => setAreaHumana(e.target.value)} 
                        value={areaHumana}
                    />

                    <TextField 
                        className='link'
                        label="Área Ventas" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaVentas"
                        onChange={(e) => setAreaVentas(e.target.value)} 
                        value={areaVentas}
                    />

                    <TextField 
                        className='link'
                        label="Área SST" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaSST"
                        onChange={(e) => setAreaSST(e.target.value)} 
                        value={areaSST}
                    />

                    <TextField 
                        className='link'
                        label="Área Planeación" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaPlaneacion"
                        onChange={(e) => setAreaPlaneacion(e.target.value)} 
                        value={areaPlaneacion}
                    />

                    <TextField 
                        className='link'
                        label="Área Servicios" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="areaServicios"
                        onChange={(e) => setAreaServicios(e.target.value)} 
                        value={areaServicios}
                    />

                    <TextField 
                        className='link'
                        label="Icontec" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="icontec"
                        onChange={(e) => setIcontec(e.target.value)} 
                        value={icontec}
                    />

                    <TextField 
                        className='link'
                        label="BASC" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="basc"
                        onChange={(e) => setBasc(e.target.value)} 
                        value={basc}
                    />

                    <TextField 
                        className='link'
                        label="FSSC" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="fssc"
                        onChange={(e) => setFssc(e.target.value)} 
                        value={fssc}
                    />

                    <TextField 
                        className='link'
                        label="Acciones Pendientes" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="accionesPendientes"
                        onChange={(e) => setAccionesPendientes(e.target.value)} 
                        value={accionesPendientes}
                    />

                    <TextField 
                        className='link'
                        label="Programación de Auditorías" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="programacionAuditorias"
                        onChange={(e) => setProgramacionAuditorias(e.target.value)} 
                        value={programacionAuditorias}
                    />

                    <TextField 
                        className='link'
                        label="Área a Auditar" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="listaChequeo"
                        onChange={(e) => setAreaAuditar(e.target.value)} 
                        value={areaAuditar}
                    />

                    <TextField 
                        className='link'
                        label="Lista de Chequeo" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="listaChequeo"
                        onChange={(e) => setListaChequeo(e.target.value)} 
                        value={listaChequeo}
                    />

                    <TextField 
                        className='link'
                        label="Encuesta" 
                        style={{width: '-webkit-fill-available', margin: 12}}
                        type="text" 
                        name="encuesta"
                        onChange={(e) => setEncuesta(e.target.value)} 
                        value={encuesta}
                    />
                </div>

                <Button className='button-send-links' variant="contained" color="success" onClick={() => upploadLinks()}>Guardar</Button>

                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={openMessageLinks} autoHideDuration={6000} onClose={handleCloseMessageLinks}>
                            <Alert onClose={handleCloseMessageLinks} severity="success" sx={{  width: '100%', marginTop: '180px', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                                Links Actualizados Con Exito
                            </Alert>
                    </Snackbar>
                </Stack>
                { errorEdit && (<div className="message-bad" id="message-bad">
                    <hr />
                    <h3>Surgió un error</h3>
                    <p>{errorEdit}</p>
                    <img className="img-error" src={ imgx } alt="Error" />
                </div>) }
        </div>
    );
}