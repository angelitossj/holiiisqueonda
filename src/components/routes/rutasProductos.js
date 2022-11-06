const router = require('express').Router()

const {
getProductos,
postProducto,
putProducto,
deleteProductos,
getProductosIdProveedor





}=require("../controllers/ctrlProductos")
const validarProductos=require('../middlewares/validar-jwt-proveedores')


router.get("/productos",[validarProductos],getProductos)
router.post("/productos",[validarProductos],postProducto)
router.get("/productos",[validarProductos],getProductos)
router.get('/productosProveedor',[validarProductos],getProductosIdProveedor)
router.get("/productos/:idProductos",[validarProductos],getProductos)
router.put("/productos/:idProductos",[validarProductos],putProducto)
router.delete("/Productos/:idProductos",deleteProductos)
// router.delete("/Cliente/:idCliente",[validarJWT],deleteCliente)


module.exports=router