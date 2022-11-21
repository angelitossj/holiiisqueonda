const Proveedores = require("../models/modeloProveedores")
const bcrypt = require('bcrypt')

const validator=require('validator')

const CtrlCProveedores = {}


CtrlCProveedores.getProveedores = async (req, res) => {
    try {


        const proveedor = await Proveedores.find(({isActive:true}))

    if (!proveedor.length){
        return res.status(404).json({
            message:"No existe usuario Proveedor en la base de datos"
        })
    }
        return res.json({
            message: "Proveedores encontrado",
            proveedor

        })

    } catch (error) {
        return res.json({
            message: "error"
        })
    }


}
CtrlCProveedores.getProveedoresCategorias = async (req, res) => {
    try {

        const categoria=await Proveedores.findOne({categorias:req.params.categorias})
        
        const proveedor = await Proveedores.find(({categorias:'Lacteos'}))

    if (!proveedor.length){
        return res.status(404).json({
            message:"No existe usuario Proveedor en la base de datos"
        })
    }
        return res.json({
            message: "Proveedores encontrado",
            proveedor

        })

    } catch (error) {
        return res.json({
            message: "error"
        })
    }


}
// CtrlCProveedores.getProveedores = async (req, res) => {
//     try {
//         const idUsuario = req.user._id
//         console.log(idUsuario)
//         const user = await Usuario.find(({
//             isActive: true
//         }))
//         if (!user.id === idUsuario) {
//             res.json({
//                 message: "no se ha encontrado el usuario con ese token"
//             })
//         }

//         return res.json({
//             message: "usuario encontrado con exito",
//             user
//         })

       

//     } catch (error) {
//         return res.json({
//             message: "error",
//             error: error.message
//         })
//     }


// }

CtrlCProveedores.getProveedoresId = async (req, res) => {
    try {
        const idProveedor = req.params.idCliente
        const proveedor = await Proveedores.findOne({
            $and: [{
                _id: idProveedor
            }, {
                isActive: true
            }]
        })
        if (proveedor)   {
            return res.json({
                message: 'Usuario',
                proveedor
            })
        }


    } catch (error) {
        return res.status(404).json({
            message: "",
            error
        })
    }


}


CtrlCProveedores.postProveedores = async (req, res) => {
    try {
        const {
            nombreOrazonSocial,
            cedulaIdentidad,
            DomicilioEmpresa,
            usuario,
            telefono,
            email,
            categorias,
            password
        } = req.body

        if ( !nombreOrazonSocial ||!cedulaIdentidad || !DomicilioEmpresa ||!telefono || !email ||!usuario || !password ||!categorias) {
            
            return res.status(400).json({
                message: "no viene informacion",
            

            })
        }
        const newPassword = bcrypt.hashSync(password, 10)

        const newProveedor = new Proveedores({
            nombreOrazonSocial,
            cedulaIdentidad,
            DomicilioEmpresa,
            usuario,
            telefono,
            email,
            categorias,
            password:newPassword
        })
        
        const verifica = await Proveedores.findOne({email:email})
        if (verifica){
            return res.json({
                message:"el usuario con este correo ya existe",

                
            })
        }
        validator.isEmail(email)
        const proveedor = await newProveedor.save()

        return res.status(201).json({
            message: "Usuario guardado correctamente",
            proveedor

        })

    } catch (error) {
        return res.status(401).json({
            message: "El usuario no se ha podido crear",
            error: error.message
        })
    }



}
CtrlCProveedores.putProveedores = async (req, res) => {
    try {
        const id = req.params.idProveedores

        const {

            nombreOrazonSocial,
            cedulaIdentidad,
            DomicilioEmpresa,
            telefono,
            usuario,
            email,
            password
        } = req.body
        const newPassword = bcrypt.hashSync(password, 10)
        if (!id || !nombreOrazonSocial ||!cedulaIdentidad || !DomicilioEmpresa ||!telefono || !email ||!usuario || !password) {
            return res.status(400).json({
                message: "no viene id o informacion",

            })
        }
        const proveedor = await Proveedores.findById(id)

        await proveedor.updateOne({  nombreOrazonSocial,
            cedulaIdentidad,
            DomicilioEmpresa,
            telefono,
            usuario,
            email,
            password:newPassword})



        return res.status(200).json({
            ok:true,
            message:"Proveedor actualizado correctamente"
        })


    } catch (error) {
        return res.status(401).json({
            error: error.message
        })
    }



}
CtrlCProveedores.deleteProveedores = async (req, res) => {
    const id = req.params.id
    try {
        const proveedor = await Proveedores.updateOne(id,{isActive: false})
        return res.json({
            message: "proveedor eliminado",

        })

    } catch (error) {
        return res.json({

            error
        })
    }
    // const tarea = await Tarea.find()

    // return res.json({
    //     message: "tarea eliminada",
    //     tarea

    // })



}



// CtrlCProveedores.deleteProveedoresTarea = async (req, res) => {
//     try {
//         const idUser = req.user._id;
//         const user = await Usuario.findOne({
//             $and: [{
//                 _id: idUser,
                
//             }, {
//                 isActive: true
//             }]
//         });
//         if (!user) {
//             return res.json({
//                 message: `El usuario ya no existe`
//             })
//         }

//         await Model.updateMany({
//             $and: [{
//                 isActive: true
//             }, {
//                 idUser
//             }]
//         }, {
//             isActive: false
//         })

//         await user.updateOne({
//             isActive: false
//         })
//         return res.json({
//             message: `Usuario eliminado correctamente.`,
//         })
//     } catch (error) {
//         return res.json({
//             message: `Error interno del servidor: ${error.message}`
//         })
//     }
// }








module.exports = CtrlCProveedores