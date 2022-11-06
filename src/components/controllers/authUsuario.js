const User =require("../models/modeloUsuarios")

const generarJWT=require("../helpers/generar-jwt")
const bcrypt=require('bcrypt')

const CtrlAuth={}

CtrlAuth.iniciarSesion=async(req,res)=>{
const {usuario,password}=req.body

try {
    const user =await User.findOne({usuario});

    if (!user){
        return res.status(400).json({
            ok:false,
            message:"Error al autenticarse, Usuario no encontrado"
        })
    }
    if (!user.isActive){
        return res.status(400).json({
            ok:false,
            message:"Error al autenticarse, Usuario en estado falso"
        })
    }
// verificar la contraseña
const validPassword=bcrypt.compareSync(password,user.password)

if (!validPassword){
    return res.status(400).json({
        message:"Error el autenticarse, Contraseña incorrecta"
    })
}
// generamos el token
const token =await generarJWT({uid:user.id})
return res.json({message:"Has iniciado sesion con exito",
token
})

} catch (error) {
    return res.json({
        message:"Error al iniciar sesion"
    })
}

}



module.exports=CtrlAuth