const {response}= require('express');

const Medicos = require('../models/medicos');




const getMedico = async(req, res= response) =>{

    medicos = await  Medicos.find()
                        .populate('usuario','nombre img')
                        // .populate('hospital','nombre')
                        

    res.json({
        ok:true,
        medicos
    })

}

const crearMedico = async(req, res= response) =>{

    const uid = req.uid;
    const medicos = new Medicos({
        usuario:uid,
        ...req.body
    });


    try{

        const medicosDB = await medicos.save();

        res.json({
            ok:true,
            medicos: medicosDB
        })
    

    }
    catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'

        })
    }

    
}

const ActualizarMedico = (req, res= response) =>{

    res.json({
        ok:true,
        msg: 'Actualizar Medicos'
    })

}

const BorrarMedico = (req, res= response) =>{

    res.json({
        ok:true,
        msg: 'Borrar Medicos'
    })

}





module.exports={
    getMedico,
    crearMedico,
    ActualizarMedico,
    BorrarMedico
}