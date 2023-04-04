import React, { useContext, useEffect, useState } from 'react';
import { HtmlTooltip } from '../../../elements/TooltipReuse';
import { Modal, TextField, Button } from '@material-ui/core';
import { motion } from "framer-motion"
import '.././styleBosses.css';
import './BossesUsers.css';
import { useGetAllUsers } from '../../../services/useGetAllUsers/useGetAllUsers';
import { useDeleteUser } from '../../../services/useDeleteUser/useDeleteUser';
import { useEditUser } from '../../../services/useEditUser/useEditUser';
import { useCreateUser } from '../../../services/useCreateUser/useCreateUser';
import { SUBROL } from '../../../utils/constanst';
import { GlobalContext } from '../../../state/GlobalState';
import imgx from '../../../assets/icon/x.png'
import imgSearch from '../../../assets/icon/search.png'
import imgAdd from '../../../assets/icon/add.png'
import imgEdit from '../../../assets/icon/card/edit.png'
import imgDelete from '../../../assets/icon/card/delete.png'

export const BossesUsers = () => {
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [userSelected, setUserSelected] = useState({})

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [rol, setRol] = useState('')
    const [subrol, setSubrol] = useState('')
    // eslint-disable-next-line
    const {user, setUser} = useContext(GlobalContext)

    const {users, getAllUsers, nextAndPrevious, count, pag, search, handleChangeSearchInput, handleChangeSearchSelectRol, searchInput, searchSelectRol} = useGetAllUsers()

    const {deleteId} = useDeleteUser(() => {
        getAllUsers()
        setModalDelete(false)
    })

    const {sendRequestEdit, error:errorEdit} = useEditUser(() => {
        getAllUsers()
        setModalEdit(false)
        setUserSelected({})
    }, {name, rol, subrol, email})

    const {sendRequest, error:errorCreate} = useCreateUser(() => {
        getAllUsers()
        setModalCreate(false)
    }, {name, rol, subrol, email, password, password2})
    
    useEffect(() => {
        setRol(user ? user.rol : '')
        getAllUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getRol = (rol) => {
        if(rol === 'auditors') {
            const rolUser = 'Auditor'
            return rolUser
        }else{
            const rolUser = 'Administrador'
            return rolUser
        }
    }

    const onModalCreate = () => {
        setModalCreate(!modalCreate)
    }

    //Activar función con la tecla enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            search()
        }
    };

    const bodyModalCreate = (
        <motion.div
            className="container"
            initial={{ scale: .5, y:200, rotate:80 }}
            animate={{ rotate:0, scale: 1 }}
            transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            }}>
        <div className='modal'>
            <div className='modal-title'>
                <h2>Crear Usuario</h2>
            </div>
            <div className="modal-inputs">
                <div className="rol-name">
                    <div className="select-wrap">
                        <select 
                            name="rol"
                            className="select-field"
                            onChange={(e) => setRol(e.target.value)} 
                            value={rol}
                        >
                            <option hidden value>Rol</option>
                            <option value="auditors">Auditor</option>
                            <option value="bosses">Administrador</option>
                        </select>
                    </div>
                    <div className="select-wrap">
                        <select 
                            name="subrol"
                            className="select-field"
                            onChange={(e) => setSubrol(e.target.value)} 
                            value={subrol}
                        >
                            <option hidden value>Subrol</option>
                                <option value="logistics">Logística</option>
                                <option value="pastificio">Pastificio, empaque y molino</option>
                                <option value="business">Planear y administrar negocio</option>
                                <option value="marketing">Mercadeo</option>
                                <option value="quality">Aseguramiento Calidad y Gestión Integral</option>
                                <option value="environmental">Ambiental</option>
                                <option value="investigation">Investigación y Desarrollo</option>
                                <option value="engineering">Ingenieria y Montajes</option>
                                <option value="control">Control Gestion</option>
                                <option value="human">Gestión Humana e Innovación</option>
                                <option value="sales">Ventas</option>
                                <option value="sst">SST y PESV</option>
                                <option value="planning">Planeación y abastecimiento</option>
                                <option value="administrative">Servicios administrativos</option>
                        </select>
                    </div>
                </div>
                <TextField 
                    className='textField'
                    label="Nombre" 
                    style={{width: 300, marginTop: 12}}
                    type="text" 
                    name="name"
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                />
                <TextField 
                    className='textField'
                    label="Email" 
                    style={{width: 300, marginTop: 12}}
                    type="text" 
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
                <TextField 
                    className='textField'
                    label="Contraseña" 
                    style={{width: 300, marginTop: 12}}
                    type="password" 
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                />
                <TextField 
                    className='textField'
                    label="Confirmar contraseña" 
                    style={{width: 300, marginTop: 12}}
                    type="password" 
                    name="password2"
                    onChange={(e) => setPassword2(e.target.value)} 
                    value={password2}
                />
            </div>
            <div className='modal-buttons'>
                <Button color="primary" onClick={sendRequest}>Enviar</Button>
                <Button onClick={()=>onModalCreate()}>Cancelar</Button>
            </div>
            {errorCreate && (<div className="message-bad" id="message-bad">
                <hr />
                <h3>Surgió un error</h3>
                <p>{errorCreate}</p>
                <img className="img-error" src={ imgx } alt="Error" />
            </div>)}
        </div>
        </motion.div>
    )

    const onModalEdit = (user) => {
        setUserSelected(user)
        setModalEdit(true)
        setRol(user.rol)
        setSubrol(user.subrol)
        setName(user.name)
        setEmail(user.email)
    }

    const bodyModalEdit = (
        <motion.div
            className="container"
            initial={{ scale: .5, y:200, rotate:80 }}
            animate={{ rotate:0, scale: 1 }}
            transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
        }}>
        <div className='modal'>
            <div className='modal-title' name="edit">
                <h2>Editar Usuario</h2>
            </div>
            <div className="modal-inputs">
                <div className="rol-name">
                    <div className="select-wrap">
                        <select 
                            name="rol"
                            className="select-field"
                            onChange={(e) => setRol(e.target.value)} 
                            value={rol}
                        >
                            <option hidden value>Rol</option>
                            <option value="auditors">Auditor</option>
                            <option value="bosses">Administrador</option>
                        </select>
                    </div>
                    <div className="select-wrap">
                        <select 
                            name="subrol"
                            className="select-field"
                            onChange={(e) => setSubrol(e.target.value)} 
                            value={subrol}
                        >
                            <option hidden value>Subrol</option>
                                <option value="logistics">Logística</option>
                                <option value="pastificio">Pastificio, empaque y molino</option>
                                <option value="business">Planear y administrar negocio</option>
                                <option value="marketing">Mercadeo</option>
                                <option value="quality">Aseguramiento Calidad y Gestión Integral</option>
                                <option value="environmental">Ambiental</option>
                                <option value="investigation">Investigación y Desarrollo</option>
                                <option value="engineering">Ingenieria y Montajes</option>
                                <option value="control">Control Gestion</option>
                                <option value="human">Gestión Humana e Innovación</option>
                                <option value="sales">Ventas</option>
                                <option value="sst">SST y PESV</option>
                                <option value="planning">Planeación y abastecimiento</option>
                                <option value="administrative">Servicios administrativos</option>
                        </select>
                    </div>
                </div>
                <TextField 
                    className='textField'
                    label="Nombre" 
                    style={{width: 300, marginTop: 12}}
                    type="text" 
                    name="name"
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                />
                <TextField 
                    className='textField'
                    label="Email" 
                    style={{width: 300, marginTop: 12}}
                    type="text" 
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
            </div>
            <div className='modal-buttons'>
                <Button onClick={() => sendRequestEdit(userSelected.id)}>Editar</Button>
                <Button onClick={()=>setModalEdit(false)}>Cancelar</Button>
            </div>
            { errorEdit && (<div className="message-bad" id="message-bad">
                <hr />
                <h3>Surgió un error</h3>
                <p>{errorEdit}</p>
                <img className="img-error" src={ imgx } alt="Error" />
            </div>) }
        </div>
        </motion.div>
    )

    const onModalDelete = (user) => {
        setUserSelected(user)
        setModalDelete(!modalDelete)
    }

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.5,
            staggerChildren: 0.5
          }
        }
      };
      
    return (
        <div className='main-bosses-user'>
            <div className="header-users">
                <div className="search-filter">
                    <div className="search-users">
                        <input type="text" id='search-user' value={searchInput} onChange = {(e) => handleChangeSearchInput(e.target.value)} onKeyDown={handleKeyDown}/>
                        <motion.button className="container"
                            whileHover={{ scale: 1,  rotate: 20, y: 10}}
                            whileTap={{ scale: 1, rotate: -10, y: -10 }}
                        >
                            <img src={ imgSearch } alt="search-user" onClick={search} />
                        </motion.button>
                    </div>
                </div>
                <div>
                    <motion.button whileTap={{ scale: 0.8 }} className="button-add-user" onClick={onModalCreate}><img src={ imgAdd } alt="" />Añadir Usuario</motion.button>
                </div>
            </div>
            <div className="content-pagination">
                <button className="buttons-pagination" name="previous" onClick={() => nextAndPrevious(-1)}>
                ← 
                </button>
                <div className="pagination-text">
                    Página <b>{pag}</b> de <b>{count}</b>
                </div>
                <button className="buttons-pagination" name="next" onClick={() => nextAndPrevious(1)}>
                →
                </button>
            </div>
            <div className="content-cards-users">
            <motion.ul 
                className="container"
                name="card-user"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                    {users.map((user) => (
                                <div className="card-user">
                                    <div className="inf-user">
                                        <div className="inf-general">
                                            <h3>{getRol(user.rol)}</h3>
                                            <h4>{user.nevel ? 'Misión #'+user.nevel : 'Misión #0'}</h4>
                                            <h5>{SUBROL[user.subrol]}</h5>
                                        </div>
                                        <hr />
                                        <div className="inf-personal">
                                            <h4>{user.name}<br /></h4>
                                            <h6><i>{user.email}<br /></i></h6>
                                        </div>
                                    </div>
                                    <div className="card-buttons-user">
                                        <HtmlTooltip title='Editar' placement="left" arrow>
                                            <button onClick={()=>onModalEdit(user)}><img src={ imgEdit } alt="card-edit-user" /></button>
                                        </HtmlTooltip>
                                        <HtmlTooltip title='Eliminar' placement="right" arrow>
                                            <button onClick={()=>onModalDelete(user)}><img src={ imgDelete } alt="card-delete-user" /></button>    
                                        </HtmlTooltip>
                                    </div>
                                </div>
                        ))}
            </motion.ul>
            </div>
            <Modal
                open={modalCreate}
                onClose={onModalCreate}>
                    {bodyModalCreate}
            </Modal>
            <Modal
                open={modalDelete}
                onClose={onModalDelete}>
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
                        <div className='modal'>
                        <div className='modal-title' name="delete">
                            <h2>Eliminar Usuario</h2>
                        </div>
                        <p className='pModalDelete'>¿Desea eliminar el usuario<br/><b>{userSelected.name}</b>?</p>
                        <div className='modal-buttons'>
                            <Button color="Secondary" onClick={() => deleteId(userSelected.id)}>Eliminar</Button>
                            <Button onClick={()=>setModalDelete(false)}>Cancelar</Button>
                        </div>
                    </div></motion.div>}
            </Modal>
            <Modal
                open={modalEdit}
                onClose={onModalEdit}>
                    {bodyModalEdit}
            </Modal>
            </div>
    );
}