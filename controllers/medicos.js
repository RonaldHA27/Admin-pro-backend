const {response}= require('express');

const Medicos = require('../models/medicos');




const getMedico = async(req, res= response) =>{

    medicos = await  Medicos.find()
                        .populate('usuario','nombre img')
                        .populate('hospital','nombre')
                        

    res.json({
        ok:true,
        medicos
    })

}

const getMedicoById = async(req, res= response) =>{

    const id = req.params.id;

    try {
        
        medicos = await  Medicos.findById(id)
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre')

        res.json({
            ok:true,
            medicos
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok:true,
            msg:'Hable con el administrador'
        })
    }


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

const ActualizarMedico = async(req, res= response) =>{

    const id = req.params.id;
    const uid = req.uid;


    try{

        const medicos = await Medicos.findById(id);

        if(!medicos){
            return res.status(404).json({
                ok:true,
                msg:'medico no encontrado por id'
            })
        }   

        const cambiosMedico = {
            ...req.body,
            usuario:uid 
        }

        const MedicosActualizado = await Medicos.findByIdAndUpdate(id,cambiosMedico,{ new:true})

        res.json({
            ok:true,
            medico:MedicosActualizado
        })

    }
    catch(error){
        return res.status(404).json({
            ok:false,
            msg:"Habla con el administrador"
        });
    }

    

}

const BorrarMedico = async(req, res= response) =>{

    const id = req.params.id;
    

    try{

        const medicos = await Medicos.findById(id);

        if(!medicos){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
    
            })
        }


        await Medicos.findByIdAndDelete(id);
        
        res.json({
            ok:true,
            msg: 'Médico eliminado'
        })
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    

}





module.exports={
    getMedico,
    crearMedico,
    ActualizarMedico,
    BorrarMedico,
    getMedicoById
}