const Cliente = require("../models/modeloCliente")
const bcrypt = require('bcrypt')

const validator=require('validator')

const CtrlCliente = {}


CtrlCliente.getCliente = async (req, res) => {
    try {


        const cliente = await Cliente.find({isActive:true})

    if (!cliente.length){
        return res.status(404).json({
            message:"No existe usuario cliente en la base de datos"
        })
    }
        return res.json({
            message: "Cliente encontrado",
            cliente

        })

    } catch (error) {
        return res.json({
            message: "error"
        })
    }


}
// CtrlCliente.getCliente = async (req, res) => {
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

CtrlCliente.getClienteId = async (req, res) => {
    try {
        const idCliente = req.params.idCliente
        const cliente = await Cliente.findOne({
            $and: [{
                _id: idCliente
            }, {
                isActive: true
            }]
        })
        if (cliente)  {
            return res.json({
                message: 'Usuario',
                cliente
            })
        }


    } catch (error) {
        return res.status(404).json({
            message: "",
            error
        })
    }


}


CtrlCliente.postCliente = async (req, res) => {
    try {
        const {
            nombreCliente,
            usuario,
            email,
            password
        } = req.body


        const newPassword = bcrypt.hashSync(password, 10)

        const newCliente = new Cliente({
            nombreCliente,
            usuario,
            email,
            password: newPassword 
        })
        
        const Client = await Cliente.findOne({email:email})
        if (Client){
            return res.json({
                message:"el usuario con este correo ya existe",

                
            })
        }
        validator.isEmail(email)
        const cliente = await newCliente.save()

        return res.status(201).json({
            message: "Usuario guardado correctamente",
            cliente

        })

    } catch (error) {
        return res.status(401).json({
            message: "El usuario no se ha podido crear",
            error: error.message
        })
    }



}
CtrlCliente.putCliente = async (req, res) => {
    try {
        const id = req.params.idCliente

        const {

            nombreCliente,
            nombreUsuario,
            email,
            password
        } = req.body
        const newPassword = bcrypt.hashSync(password, 10)
        if (!id || !nombreCliente || !nombreUsuario || !email || !password) {
            return res.status(400).json({
                message: "no viene id o informacion",

            })
        }
        const cliente = await Cliente.findById(id)

        await cliente.updateOne({nombreCliente,nombreUsuario,email,password:newPassword})



        return res.status(200).json({
            ok:true,
            message:"usuario actualizado correctamente"
        })


    } catch (error) {
        return res.status(401).json({
            error: error.message
        })
    }



}
CtrlCliente.deleteCliente = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.updateOne(id, {
            isActive: false
        })
        return res.json({
            message: "usuario eliminado",

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



// CtrlCliente.deleteClienteTarea = async (req, res) => {
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








module.exports = CtrlCliente