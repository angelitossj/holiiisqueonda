const Publicacion = require("../models/modeloPublicaciones")
require('../models/modeloCliente')

const CtrlPublicaciones = {}

CtrlPublicaciones.getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find({
            active: true
        })
        if (!publicaciones.length) {
            return res.status(404).json({
                message: "no existe ninguna publicacion"
            })
        }

        return res.json({
            message: "publicacion encontrada con exito",
            publicaciones
        })


    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }


}
CtrlPublicaciones.getPublicacionesIdCliente = async (req, res) => {
    try {
        const idCliente = req.clientes._id
        
        if (!idCliente) {
            return res.json({
                message: "no viene el id del proveedor"
            })
        }
        const publicacion = await Publicacion.find({
                idCliente
            })
            .populate('idCliente', ['nombreCliente'])


        if (!publicacion.length) {
            return res.status(404).json({
                message: "no se encontraron productos con este proveedor"
            })
        }

        return res.json({
            publicacion
        })

    } catch (error) {
        res.status(500).json({
            message: "No se pudo obtener las publicaciones",
            errorBody: error.message
        })
    }

}

CtrlPublicaciones.postPublicaciones = async (req, res) => {
    try {
        
        const {
            idProveedor,
            idProducto,
            cantidad,
            nombreProducto

        } = req.body
        // if (!idCliente || !descripcion || !categoria || !productos ) {
        //     return res.status(400).json({
        //         message: "La informacion proporcionada es incorrecta"
        //     })
        // }

        const newPublicacion = new Publicacion({
            idProveedor,
            idProducto,
            cantidad,
            nombreProducto,
        })
        const publiRegistrada = await newPublicacion.save()

        return res.status(201).json({
            message: "el producto  fue registrado con  exito",
            publiRegistrada
        })

    } catch (error) {
        res.status(401).json({
            message: "No se pudo generar el producto",
            errorBody: error.message,
            errorName: error.name
        })
    }
}

CtrlPublicaciones.putPublicaciones = async (req, res) => {
    try {
        const idPublicaciones = req.params.idPublicaciones
        const idCliente = req.clientes._id
        const {
            descripcion,
            categoria,
            productos,
        } = req.body
        if (!idCliente || !descripcion || !categoria || !productos) {
            return res.status(401).json({
                message: "La informacion dada es incorrecta"
            })
        }
        const publicacion = await Publicacion.findById(idPublicaciones)
        const userIdString = idCliente.toString()
        const tareaIdString = publicacion.idCliente.toString()
        if (!((userIdString === tareaIdString) || req.user.role === 'cliente')) {
            return res.status(403).json({
                message: "No tiene permiso para editar la publicacion"
            })
        }
        // const complete = Publicacion.findById(idCliente, {
        //     estado
        // })

        // if (complete = "completado") {
        //     return res.json({
        //         message: "la tarea ya ha sido completada"
        //     })
        // }

        await publicacion.updateOne({
            descripcion,
            categoria,
            productos,
        })
        return res.status(201).json({
            message: "la publicacion fue modificada con exito"
        })

    } catch (error) {}

}

CtrlPublicaciones.deletePublicaciones = async (req, res) => {
    try {
        const idCliente = req.clientes._id
        const idPublicaciones = req.params.idpublicaciones
        const publicacion = await Publicacion.findOne({
            $and: [{
                _id: idCliente
            }, {
                isActive: true
            }]
        })
        if (!publicacion || !publicacion.isActive) {
            res.status(404).json({
                message: "No existe la publicacion"
            })

        }
        const userIdString = idCliente.toString() //recibo el ID que me pasa el validateJWT y lo convierto a STRING
        const tareaIdString = publicacion.idCliente.toString() //recibo la propiedad idUser de la Task y lo convierto a STRING para luego comparar
        if (!((userIdString === tareaIdString) || req.usuario.role === 'cliente')) {
            res.status(500).json({
                message: "no posee permiso para eliminar esta publicacion",

            })
        }
        await publicacion.updateOne({
            isActive: false
        })
        return res.status(201).json({
            message: "la publicacion fue eliminada con exito"
        })


    } catch (error) {
        res.status(401).json({
            message: "hubo un error al eliminar la publicacion",
            error: error.message
        })
    }


}

module.exports = CtrlPublicaciones