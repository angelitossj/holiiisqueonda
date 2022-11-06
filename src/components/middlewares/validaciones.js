const  User = require("../models/modeloUsuarios")




const validarCampos = async (req,res,next)=>{
try {
 const regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const {nombre,usuario,email,password}=req.body

    if (!nombre.length || !usuario.length){
        return res.status(401).json({
            message:"el campo de nombre y el de usuario no puede estar vacio"
        })

    }
    
    if (usuario.length < 8 ){
        return res.json({message:"el campo de usuario debe ser mayor a 8 caracteres"})
    }
    
    if (!email.length || !email.length > 8){
        return res.json({
            message:"el email no puede estar vacio y debe ser mayor a 8 caracteres"
        })
    }
    if (!password.length ){
        return res.json({
            message:"el campo de password no puede estar vacio"
        })
    }
    if (password.length < 6 ){
        return res.json({
            message:"esta colocando una contraseña muy corta, intente de nuevo "
        })
    }
    
    // if (!regexEmail.test(email) || !regex.test(email)) {
    //     return res.json({
    //         message:"los parametros del email son invalidos"
    //     })
    // }
    if (!regexEmail.test(email)){
        return res.json({
            message:"parametros invalidos"
        })
    }
    next()
} catch (error) {
    return res.json({error:error.message})
}

}

module.exports=validarCampos