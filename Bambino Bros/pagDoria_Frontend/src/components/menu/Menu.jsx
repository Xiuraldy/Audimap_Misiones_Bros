import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HtmlTooltip } from '../../elements/TooltipReuse';
import { useGetInfUser } from "../../services/useGetInfUser/useGetInfUser";
import { GlobalContext } from "../../state/GlobalState"
import { NAME_PAG, SUBROL } from "../../utils/constanst";
import audimap from "../../assets/logo/Audimap.JPG"; 
import userRol from "../../assets/icon/menu/userRol/user.gif";
import logout from "../../assets/icon/menu/logout.png";
import SIG from "../../assets/logo/SIG.JPG";
import './styleMenu.css' 

export const Menu = () => {
    const navigate = useNavigate()
    const [rol, setRol] = useState('')
    // const [subrol, setSubrol] = useState('')
    const [name, setName] = useState('')
    const {user, setUser} = useContext(GlobalContext)
    const [itemSelected, setItemSelected] = useState('')
    let location = useLocation();
    useEffect(() => {
        setRol(user ? user.rol : '')
        // setSubrol(user ? user.subrol : '')
        setName(user ? user.name : '')
        if(user){
            setItemSelected(location.pathname.split('/')[2])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

    const clearLocalStorage = () => {
        setUser(null)
        localStorage.clear()
        navigate('/sign-up-login')
        document.body.classList.remove("shrink")
    }

    const redirect = (value) => {
        setItemSelected(value)
        navigate(`/${rol}/${value}`)
    }

    // const firstName = (name) => {
    //     const nameUser = name.name;
    //     const cutName = nameUser.split(' ');
    //     const firstName = cutName[0];
    //     return firstName
    // }

    //Desaparecer las misiones al oprimir alguna
    const urlActual = window.location.href
    // console.log('window', urlActual)
    // console.log('url',`http://10.15.20.15:443/${rol}`)
    let displayNone = 'false'
    if(urlActual === `http://10.15.20.15:443/audimap/${rol}`){
        displayNone = 'false'
        // console.log('displayNone', displayNone)
    }else{
        displayNone = 'true'
        // console.log('displayNone', displayNone)
    }

    const [id, setId] = useState("")
    const {getInfUser, nevel} = useGetInfUser()

    useEffect(() => {
        setId(user ? user.id : "")
    }, [user])
    
    useEffect(() => {
        if(id){
            getInfUser(id) 
        }
        // eslint-disable-next-line
    }, [id])

    return (
        rol ? (    
            <div> 
                <div className="content-page">
                    <div className="sidebar-footer">
                            <div className="user-rol">
                                <img src={ audimap } alt="Audimap" className="logo-footer"/>
                                <div className="user-profile hide">
                                    <img src={ userRol } alt="userRolCircle-png" className="userRolCircle" />
                                    <div className="user-info">
                                        <h3>{name}</h3>
                                        {rol==='auditors' && <h5>Auditor</h5>}
                                        {rol==='bosses' && <h5>Administrador</h5>}
                                        <h4>{user ? SUBROL[user.subrol] : ''}</h4>
                                        <div className="users-missions">
                                            <div className="button-menu">
                                                <button className='tecla' onClick={()=>navigate(`/${user.rol}`)}>Misiones</button>
                                            </div>
                                            {rol==='bosses' && 
                                                <div onClick={() => redirect('links')}>
                                                    <span className="tecla">Links</span>
                                                </div>
                                            }
                                            {rol==='bosses' && 
                                                <div onClick={() => redirect('users')}>
                                                    <span className="tecla">Usuarios</span>
                                                </div>
                                            }
                                            {rol==='auditors' && 
                                                <div onClick={() => redirect('help')}>
                                                    <span className="tecla">Ayuda</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <HtmlTooltip title="Salir" placement="right" arrow>
                                    <button className="log-out" onClick={clearLocalStorage}>
                                        <img src={ logout } alt="logout-png" className="width-logout" />
                                    </button> 
                                </HtmlTooltip>
                                <img src={ SIG } alt="SIG" className="logo-footer"/>
                            </div>
                        </div>
                        <div className="img-clouds">{NAME_PAG[window.location.href]}</div>
                            <ul className="ul-menu" name={displayNone}>
                                <HtmlTooltip title="Líder: Cita a tu equipo de auditores para planificar el ejercicio de auditoría" placement="top" arrow>
                                        <div onClick={() => redirect('1')} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className='button-game'>1</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip title="Objetivo: Prepárense, estudien el proceso que van a auditar." placement="top" arrow>
                                        <div onClick={nevel >= 1 ? () => redirect('2') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 1 ? "disabled" : ""}>2</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip title="Objetivo: Elaboren el plan de auditoría" placement="top" arrow>
                                        <div onClick={nevel >= 2 ? () => redirect('3') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 2 ? "disabled" : ""}>3</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip title="Objetivo: Elaboren la lista de chequeo en Drive" placement="top" arrow>
                                        <div onClick={nevel >= 3 ? () => redirect('4') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 3 ? "disabled" : ""}>4</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip title="Objetivo: Agenden a las personas que van a auditar" placement="top" arrow>
                                        <div onClick={nevel >= 4 ? () => redirect('5') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 4 ? "disabled" : ""}>5</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip title="Objetivo: ¡Llegó el gran día!, tengan una buena conversación con los auditados y registren sus hallazgos durante la auditoría en curso" placement="top" arrow>
                                        <div onClick={nevel >= 5 ? () => redirect('6') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 5 ? "disabled" : ""}>6</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip title="Objetivo: Compartan los resultados a los auditados a través de un correo electrónico" placement="top" arrow>
                                        <div onClick={nevel >= 6 ? () => redirect('7') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 6 ? "disabled" : ""}>7</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip title="Objetivo: Suban el informe a Conexión" placement="top" arrow>
                                        <div onClick={nevel >= 7 ? () => redirect('8') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 7 ? "disabled" : ""}>8</span>
                                        </div>
                                </HtmlTooltip>
                                <HtmlTooltip data-html="true" title="Objetivo: ¿Qué tal estuvo la experiencia?
                                Envíen el formulario de encuesta de satisfacción a sus auditados" placement="top" arrow>
                                        <div onClick={nevel >= 8 ? () => redirect('9') : ''} className={`${itemSelected === 'view' ? 'activeItem' : 'inactiveItem'}`}>
                                            <span className="button-game" name={nevel < 8 ? "disabled" : ""}>9</span>
                                        </div>
                                </HtmlTooltip>
                            </ul>
                </div>
            </div>
        ) : <></>
    )
}