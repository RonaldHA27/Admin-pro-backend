require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//Crear el servidor express
const app = express(); 

//Base de datos
dbConnection();

//Configurar Cors
app.use(cors());

//zW8pZveT3hVC8r5V


//Rutas 

app.get( '/',(req, res) =>{

    res.json({
        ok:true,
        msg:"Hola Mundo"
    })

})

app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo en puerto ' + 3000);
});