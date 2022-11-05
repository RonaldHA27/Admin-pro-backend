const { response}= require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async (req, res= response) => {


   //Verificar Email 
    const { email , password} = req.body;


    try{
        
        const usuarioDB= await Usuario.findOne({email});
        
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'Email no válida'
            });
        }

    //Verificar constraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'constraseña no válida'
            })
        }
        
        //  Generar el token = JWT

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role)
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:'false',
            msg:'Hable con el administrador',
        })
    }

}


const googleSignIn = async(req, res = response)=>{

    try{
        const {email, name, picture} = await googleVerify(req.body.token);
        
        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario= new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario= usuarioDB;
            usuario.google= true;
           
        }


        //Guardar Usuario
        await usuario.save();

        //Generar el TOKEM - JWT 
        const token = await generarJWT(usuario.id);
        
        res.json({
            ok:true,
            email, name, picture,
            token,
            menu: getMenuFrontEnd(usuario.role)
        })

    }catch(error){  

        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Token Google no es correcta'
        })
    }

    
    
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //generar Token

    const token = await generarJWT(req.uid)

    //Obtener el usuario por UID
    const usuario = await Usuario.findById( uid);

    res.json({
        ok:true, 
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });

}


module.exports = {
    login,
    googleSignIn,
    renewToken
}