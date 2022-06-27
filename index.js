require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');


//Crear el servidor express
const app = express(); 

//Configurar Cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json() );

//Base de datos
dbConnection();
//Rutas 

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));





app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo en puerto ' + 3000);
});
