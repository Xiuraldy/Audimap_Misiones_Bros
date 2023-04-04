const cors = require('cors'); 
const bodyparser = require('body-parser')
const express = require('express');
const { pool } = require('./queries');
const { config } = require('dotenv')
const md5 = require('md5'); 

config();

const app = express();

app.use(cors())
app.use(bodyparser.json())

//Registro
app.post('/api/sign-up', (req, res, next)=>{
    const {name, password, password2, rol, subrol, email} = req.body
    if(password != password2){
        return next(new Error('Las constraseñas no coinciden'))
    }
    console.log('email', email)
    pool.query(`select count(*) from users where email='${email.toLowerCase()}'`, (error,count)=>{
        if(error){
            return next(error);
        }
        if(count.rows[0].count > 0){
            console.log('count', count.rows)
            return next(new Error('El email ya está registrado'))
        }
            pool.query('INSERT INTO users (name, password, rol, subrol, email) values ($1, md5($2), $3, $4, $5)', [name, password, rol, subrol, email.toLowerCase()], (error,result)=>{
                if(error){
                    return next(error);
                }
                console.log('Entro Insert')
                    // res.send({name, email: email.toLowerCase(), rol, subrol});
                    // console.log('req.body --->', req.body)
                pool.query(`SELECT * FROM users WHERE email='${email.toLowerCase()}'`, (error,user)=>{
                    console.log("entre a select")
                    console.log('user.rows',user.rows)
                    if(error){
                        return next(error);
                    }
                    if(!user.rows.length){
                        return next(new Error('Credenciales incorrectas'))
                    }
                    const userFind = user.rows[0]
                    res.send({
                        id: userFind.id,
                        name: userFind.name,
                        email: userFind.email,
                        rol: userFind.rol,
                        subrol: userFind.subrol,
                        nevel: userFind.nevel
                    })
                })

            })
    })
})


//Inicio de Sesión
app.post('/api/login', (req, res, next)=>{
    const {password, email} = req.body
    pool.query(`SELECT * FROM users WHERE email='${email.toLowerCase()}'`, (error,user)=>{
        if(error){
            return next(error);
        }
        if(!user.rows.length){
            return next(new Error('Credenciales incorrectas'))
        }
        const userFind = user.rows[0]
        if(userFind.password !== md5(password)){
            return next(new Error('Credenciales incorrectas'))
        }
        res.send({
            id: userFind.id,
            name: userFind.name,
            email: userFind.email,
            rol: userFind.rol,
            subrol: userFind.subrol,
            nevel: userFind.nevel
        })
    })
})

//Consultar Usuarios
app.get('/api/users', (req, res, next)=>{
    // console.log('req -->', req.query)
    const search = req.query.search ? `WHERE (name ilike '%${req.query.search[0]}%' or email ilike '%${req.query.search[0]}%') and rol ilike '%${req.query.search[1]}%'` : '';
    // console.log('search --> ', search)
    pool.query(`SELECT * FROM users ${search} order by id DESC limit 9 offset ${(req.query.pag-1)*9}`, (error, result) => {
        if(error){
            console.log('error data -->', error)
            return next(error);
        }
        pool.query(`SELECT COUNT(*) FROM users ${search}`, (errorCount, resultCount) => {
            if(errorCount){
                console.log('error count -->', error)
                return next(errorCount);
            }
            res.send({data: result.rows, count: resultCount.rows[0].count})
        })
    })
})

//Eliminar Usuarios
app.delete('/api/users/:id', (req, res)=>{
    pool.query('DELETE FROM users WHERE id='+req.params.id+' RETURNING *', (error,result)=>{
        if(error){
            throw error;
        }else{
            res.send(result.rows[0])
        }
    })
})

//Actualizar Usuarios
app.put('/api/users/:id', (req, res)=>{
    const {name, rol, subrol, email} = req.body;
    // console.log(req.params.id, name, rol, email);
    pool.query('UPDATE users SET rol =\''+rol+'\', subrol =\''+subrol+'\', name =\''+name+'\', email =\''+email+'\' WHERE id ='+req.params.id, (error,result)=>{
        if(error){
            throw error;
        }else{
            res.send({message: 'Actualizado'});
        }
    })
})

//Ingreso de Nivel
app.put('/api/nevel/:id', (req, res) => {
    const { nevel } = req.body;
    pool.query('UPDATE users SET nevel =\''+nevel+'\' WHERE id =' + req.params.id, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send({ message: 'Actualizado' });
        }
    })
})

//Consultar Información
app.get('/api/inf/user/:id', (req, res, next)=>{
    pool.query(`SELECT * FROM users where id= ${req.params.id}`, (error, result) => {
        if (error) {
            return next(error)
        }
        if(result.rows.length === 0) {
            return next(new Error("Usuario no encontrado"));
        }
        res.send(result.rows[0]);
    })
})

//Ingreso de Links
app.put('/api/put/links', (req, res) => {
    const { mapaDeValor, politicaIntegral, riesgos, matrizRiesgos, areaLogistica, areaLogistica2, areaPastificio, areaNegocio, areaMercadeo, areaCalidad, areaAmbiental, areaInvestigacion, areaIngenieria, areaControl, areaHumana, areaVentas, areaSST, areaPlaneacion, areaServicios, icontec, basc, fssc, accionesPendientes, programacionAuditorias, areaAuditar, listaChequeo, encuesta } = req.body;
    pool.query(`UPDATE links SET "mapaDeValor" = \'${mapaDeValor}\', "politicaIntegral" = \'${politicaIntegral}\', "riesgos" = \'${riesgos}\', "matrizRiesgos" = \'${matrizRiesgos}\', "areaLogistica" = \'${areaLogistica}\', "areaLogistica2" = \'${areaLogistica2}\', "areaPastificio" = \'${areaPastificio}\', "areaNegocio" = \'${areaNegocio}\', "areaMercadeo" = \'${areaMercadeo}\', "areaCalidad" = \'${areaCalidad}\', "areaAmbiental" = \'${areaAmbiental}\', "areaInvestigacion" = \'${areaInvestigacion}\', "areaIngenieria" = \'${areaIngenieria}\', "areaControl" = \'${areaControl}\', "areaHumana" = \'${areaHumana}\', "areaVentas" = \'${areaVentas}\', "areaSST" = \'${areaSST}\', "areaPlaneacion" = \'${areaPlaneacion}\', "areaServicios" = \'${areaServicios}\', "icontec" = \'${icontec}\', "basc" = \'${basc}\', "fssc" = \'${fssc}\', "accionesPendientes" = \'${accionesPendientes}\', "programacionAuditorias" = \'${programacionAuditorias}\', "areaAuditar" = \'${areaAuditar}\', "listaChequeo" = \'${listaChequeo}\', "encuesta" = \'${encuesta}\'`, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send({ message: 'Actualizado' });
        }
    })
})

//Consultar Links
app.get('/api/get/links', (req, res, next)=>{
    pool.query(`SELECT * FROM links`, (error, result) => {
        if (error) {
            return next(error)
        }
        if(result.rows.length === 0) {
            return next(new Error("Usuario no encontrado"));
        }
        res.send({ nevel: result.rows[0] });
    })
})

//Misión 2 (Subir o Actualizar Notas)
// app.put('/api/missionTwo/:id', (req, res) => {
//     const { notes } = req.body;
//     pool.query('UPDATE users SET "missionTwo" =\''+notes+'\' WHERE id =' + req.params.id, (error, result) => {
//         if (error) {
//             throw error;
//         } else {
//             res.send({ message: 'Actualizado' });
//         }
//     })
// })

//Misión 3 (Subir o Actualizar Link)
app.put('/api/:column/:id', (req, res) => {
    const { notes } = req.body;
    console.log('req.params.column', req.params.column)
    console.log('req.params.id', req.params.id)
    console.log('UPDATE users SET "'+req.params.column+'" =\''+notes+'\' WHERE id =' + req.params.id)
    pool.query('UPDATE users SET "'+req.params.column+'" =\''+notes+'\' WHERE id =' + req.params.id, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send({ message: 'Actualizado' });
        }
    })
})

//Error 500
app.use(function(err, req, res, next) {
    console.log('Entro a error 500');
    res.status(500).send({
        error: err.message 
    })
});

//Puerto
const puerto = process.env.PORT || 3000;

app.listen(puerto, function(){
    console.log("Servidor OK EN PUERTO:"+puerto);
});