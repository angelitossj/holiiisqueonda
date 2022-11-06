const Producto = require("../models/modeloProductos")
require('../models/modeloProveedores')

const CtrlProductos = {}

CtrlProductos.getProductos = async (req, res) => {
    try {
        const producto = await Producto.find({
            active: true
        })
        if(!producto.length){
            return res.status(404).json({
                message:"no existe ningun producto"
            })
        }

        return res.json({
            message: "producto encontrado con exito",
            producto
        })


    } catch (error) {
return res.status(404).json({error: error.message})
    }


}
CtrlProductos.getProductosIdProveedor = async (req, res) => {
    try {
        const idProveedor = req.proveedores._id
        console.log(idProveedor)
        if (!idProveedor){
            return res.json({
                message:"no viene el id del proveedor"
            })
        }
        const producto = await Producto.find({
                idProveedor 
            })
            .populate('idProveedor', ['nombreOrazonsocial',"paisOrigen"])
            

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
                categorias,
                marca,
                fechaVencimiento,
                paisOrigen
            
        } = req.body
        if (!idProveedor ||!nombreProducto || !categorias || !marca || !fechaVencimiento || !paisOrigen) {
            return res.status(400).json({
                message: "La informacion proporcionada es incorrecta"
            })
        }

        const newProducts = new Producto({
            idProveedor
            ,nombreProducto,
            categorias,
            marca,
            fechaVencimiento,
            paisOrigen
        })
        const productoRegistrado=await newProducts.save()

        return res.status(201).json({
            message:"el producto  fue registrado con  exito",
            productoRegistrado
        })

    } catch (error) {
        res.status(401).json({
            message:"No se pudo generar el producto",
            errorBody:error.message,
            errorName:error.name
        })
    }
}

CtrlProductos.putProducto =async (req,res) => {
try {
    const idTarea=req.params.idTarea
    const idUser=req.user._id
const{titulo,descripcion,estado}=req.body
if(!idUser||!titulo||!descripcion||!estado){
    return res.status(401).json({
        message:"La informacion dada es incorrecta"
    })
}
const tarea=await Tareas.findById(idTarea)
const userIdString=idUser.toString()
const tareaIdString=tarea.idUser.toString()
if (!((userIdString === tareaIdString )||req.user.role==='admin_user'))
{
    return res.status(403).json({message:"No tiene permiso para editar la tarea"})
}
const complete = Tareas.findById(idUser,{estado})

if(complete="completado"){
    return res.json({
        message:"la tarea ya ha sido completada"
    })
}

await tarea.updateOne({titulo,descripcion,estado})
return res.status(201).json({message:"la tarea fue modificada con exito"})
 
}


catch (error) {
}

}

CtrlProductos.deleteProductos = async(req,res) => {
try {
    const idUser=req.user._id
    const idTarea=req.params.idTarea
    const tareas= await Tareas.findOne({$and:[{_id:idTarea},{isActive:true}]})
if (!tareas || !tareas.isActive){
res.status(404).json({message:"No existe la tarea"})

}
    const userIdString=idUser.toString()//recibo el ID que me pasa el validateJWT y lo convierto a STRING
const tareaIdString=tareas.idUser.toString()//recibo la propiedad idUser de la Task y lo convierto a STRING para luego comparar
if (!((userIdString === tareaIdString )||req.usuario.role==='admin_user'))
{
    res.status(500).json({
        message:"no posee permiso para eliminar esta tarea",
        
    })
}
await tareas.updateOne({isActive:false})
return res.status(201).json({message:"la tarea fue eliminada con exito"})
 

} catch (error) {
    res.status(401).json({
        message:"hubo un error al eliminar la tarea",
        error:error.message
    })
}


}

module.exports = CtrlProductos