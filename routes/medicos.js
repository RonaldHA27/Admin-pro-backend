/*
Medicos
ruta: '/api/medico'
*/


const { Router }= require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos')

const {  getMedico,crearMedico,ActualizarMedico,BorrarMedico } = require('../controllers/medicos')

const { validarJWT } = require('../middlewares/validar-jwt');



const router =  Router();

router.get( '/',getMedico);

router.post( '/',
[
    validarJWT,
    check('nombre','El nombre del médico es necesario').not().isEmpty(),
    check('hospital','El hospital Id debe ser válido').isMongoId(),
    validarCampos
]
,crearMedico
);

router.put( '/:id',
[   
    
]
,ActualizarMedico
);

router.delete( '/:id',
BorrarMedico
);   






module.exports = router;