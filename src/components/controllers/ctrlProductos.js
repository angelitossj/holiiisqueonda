const Producto = require("../models/modeloProductos")
require('../models/modeloProveedores')

const CtrlProductos = {}

CtrlProductos.getProductos = async (req, res) => {
    try {
        const producto = await Producto.find({isActive:true})
        if (!producto.length) {
            return res.status(404).json({
                message: "no existe ningun producto"
            })
        }

        return res.json({
            message: "producto encontrado con exito",
            producto
        })


    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }


}
CtrlProductos.getProductosCategorias = async (req, res) => {
    try {
        const categoria = req.query.categoria
        console.log(categoria)
        const producto = await Producto.find({categoria})
        if (!producto.length) {
            return res.status(404).json({
                message: "no existe ningun producto"
            })
        }

        return res.json({
            message: "producto encontrado con exito",
            producto
        })


    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }


}
CtrlProductos.getProductosById = async (req, res) => {
    try {
        const idProducto = req.params.idProductos
        const producto = await Producto.findOne({
            $and: [{
                _id: idProducto
            }]
        })
        .populate('idProveedor',['nombreOrazonSocial'])
        //,{isActive: true}
        if (producto)  {
            return res.json({
                message: 'el producto se ha encontrado con exito',
                producto
            })
        }


    } catch (error) {
        return res.status(404).json({
            message: "",
            error:error.message
        })
    }


}

CtrlProductos.getProductosIdProveedor = async (req, res) => {
    try {
        const idProveedor = req.proveedores._id
        console.log(idProveedor)
        if (!idProveedor) {
            return res.json({
                message: "no viene el id del proveedor"
            })
        }
        const producto = await Producto.find({
                idProveedor
            })
            .populate('idProveedor', ['nombreOrazonsocial', "paisOrigen"])


        if (!producto.length) {
            return res.status(404).json({
                message: "no se encontraron productos con este proveedor"
            })
        }

        return res.json({
            producto
        })

    } catch (error) {
        res.status(500).json({
            message: "No se pudo obtener las tareas",
            errorBody: error.message
        })
    }

}

CtrlProductos.postProducto = async (req, res) => {
    try {
        const idProveedor = req.proveedores._id
        const {
            nombreProducto,
            categoria,
            marca,
            imagen,
            paisOrigen,
            precioUnitario,
            precioMayorista,
            precioOferta

        } = req.body
        if (!idProveedor || !nombreProducto || !categoria || !marca  || !paisOrigen) {
            return res.status(400).json({
                message: "La informacion proporcionada es incorrecta"
            })
        }

        const newProducts = new Producto({
            idProveedor,
            categoria,
            nombreProducto,
            marca,
            imagen,
            paisOrigen,
            precioUnitario,
             precioMayorista,
             precioOferta
            
        })
        const productoRegistrado = await newProducts.save()

        return res.status(201).json({
            message: "el producto  fue registrado con  exito",
            productoRegistrado
        })

    } catch (error) {
        res.status(401).json({
            message: "No se pudo generar el producto",
            errorBody: error.message,
            errorName: error.name
        })
    }
}

CtrlProductos.putProducto = async (req, res) => {
    try {
        const idProducto = req.params.idProductos
        const idProveedor = req.proveedores._id
        const {
            nombreProducto,
            categorias,
            marca,
            fechaVencimiento,
            paisOrigen
        } = req.body
        if (!idProveedor
             || !nombreProducto || !categorias || !marca || !fechaVencimiento || !paisOrigen) {
            return res.status(401).json({
                message: "La informacion dada es incorrecta"
            })
        }
        const producto = await Producto.findById(idProducto)
        const userIdString = idProveedor.toString()
        const tareaIdString = producto.idProveedor.toString()
        if (!((userIdString === tareaIdString) || req.user.role === 'proveedor')) {
            return res.status(403).json({
                message: "No tiene permiso para editar el producto"
            })
        }
  

        await producto.updateOne({
            nombreProducto,
            categorias,
            marca,
            fechaVencimiento,
            paisOrigen
        })
        return res.status(201).json({
            message: "El producto fue modificado con exito"
        })

    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }

}

CtrlProductos.deleteProductos = async (req, res) => {
    try {
        const idProveedor = req.proveedores._id
        const idTarea = req.params.idProducto
        const producto = await Producto.findOne({
            $and: [{
                _id: idProveedor
            }, {
                isActive: true
            }]
        })
        if (!producto|| !producto.isActive) {
            res.status(404).json({
                message: "No existe el producto"
            })

        }
        const userIdString = idProveedor.toString() //recibo el ID que me pasa el validateJWT y lo convierto a STRING
        const tareaIdString = producto.idProveedor.toString() //recibo la propiedad idUser de la Task y lo convierto a STRING para luego comparar
        if (!((userIdString === tareaIdString) || req.usuario.role === 'proveedor')) {
            res.status(500).json({
                message: "no posee permiso para eliminar el producto",

            })
        }
        await producto.updateOne({
            isActive: false
        })
        return res.status(201).json({
            message: "El producto fue eliminado con exito"
        })


    } catch (error) {
        res.status(401).json({
            message: "hubo un error al eliminar el producto",
            error: error.message
        })
    }


}

module.exports = CtrlProductos