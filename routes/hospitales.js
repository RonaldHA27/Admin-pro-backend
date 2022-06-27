/* 
    ruta: '/api/hosputales'
*/


const { Router }= require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos')

const {  getHospitales,crearHospital,ActualizarHospital,BorrarHospital } = require('../controllers/hospitales')

const { validarJWT } = require('../middlewares/validar-jwt');



const router =  Router();

router.get( '/',getHospitales);

router.post( '/',
[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos

]
,crearHospital
);

router.put( '/:id',
[   
    
]
,ActualizarHospital
);

router.delete( '/:id',
BorrarHospital
);   






module.exports = router;