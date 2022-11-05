const path= require('path');
const fs = require('fs');

const { response } = require('express');
const {v4: uuidv4} = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');




const fileUpload = async ( req, res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposPermitidos = ['hospitales','medicos','usuarios'];
    if(!tiposPermitidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un médico, usuario u hospital'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        });
    }

    //Procesar una Imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];


    //validar extension
    const extensionValida = ['jpg',' png ','jpeg','gif'];
    if( !extensionValida.includes(extensionArchivo) ){

        return res.status(400).json({
            ok:false,
            msg: 'No es una extensión permitida'
        });

    }


    //Generar nombre de archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Use the mv( ) method  to place the file somewhere en your server
    //Mover imagen
    
    file.mv(path , (err) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                msg:'error al mover la imagen'
            });
        }

        //actualizar base de datos
        actualizarImagen( tipo, id, nombreArchivo);


        res.json({
            ok:true,
            msg: 'Archivo subido',
            nombreArchivo
        })   
    });





   
}

const retornaImagen =  async ( req, res = response)=>{

    const tipo = req.params.tipo;
    const foto =req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
 
    //Imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

   

}


module.exports= {
    fileUpload,
    retornaImagen
}