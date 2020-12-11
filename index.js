const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

const Sequelize = require('sequelize');
const Agenda = require('./models').agendanueva

app.use(logger('dev'));

//variables de entorno
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//rutas y funciones.
app.get("/contactos", function (req, res) {
    return Agenda.findAll({})
    .then(Agenda => res.status(200).send(Agenda))
    .catch(error => res.status(400).send(error))
});

app.get("/contactos/:id", function (req, res) {
    return Agenda.findAll({
        where: {
                id: req.params.id
        }
    })
    .then(Agenda => res.status(200).send(Agenda))
    .catch(error => res.status(400).send(error))
});

app.post("/contactos/alta", function(req, res){
    return Agenda.create({
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        sector: req.body.sector,
        telefono: req.body.telefono
    })
    .then(Agenda => res.status(200).send(Agenda))
    .catch(error => res.status(400).send(error))
});

app.put("/contactos/edita/:id", function (req, res) {
    return Agenda.update(
        {
            nombre: req.body.nombre, 
            apellido: req.body.apellido,
            sector: req.body.sector,
            telefono: req.body.telefono
        },
        {where: {id: req.params.id}}
    )
    .then(Agenda => res.status(200).send(Agenda))
    .catch(error => res.status(400).send(error))
});

app.delete("/contactos/eliminar/:id", function (req, res) {
    return Agenda.destroy({
        where: {
                id: req.params.id
        }
    })
    .then(Agenda => res.status(200).send(Agenda))
    .catch(error => res.status(400).send(error))
});

//Verificación de ambiente   
let port;
if(process.env.NODE_ENV === "production"){
    port =  process.env.PORT_PROD;
}else{
    port =  process.env.PORT_DEV;
}

//express
app.listen(port, function () {
    console.log("Servidor Activo", port, process.env.NODE_ENV);
});