const router = require('express').Router()

const {
getProductos,
postProducto,
putProducto,
deleteProductos,
getProductosIdProveedor,
getProductosById,
getProductosCategorias





}=require("../controllers/ctrlProductos")
const validarProductos=require('../middlewares/validar-jwt-proveedores')


router.get("/product",getProductos)
router.get("/productos",getProductosCategorias)
router.get("/productos/:idProductos",[validarProductos],getProductosById)
router.post("/productos",[validarProductos],postProducto)
router.get("/productos",[validarProductos],getProductos)
router.get('/productosProveedor',[validarProductos],getProductosIdProveedor)
router.get("/productos/:idProductos",[validarProductos],getProductos)
router.put("/productos/:idProductos",[validarProductos],putProducto)
router.delete("/Productos/:idProductos",deleteProductos)
// router.delete("/Cliente/:idCliente",[validarJWT],deleteCliente)


module.exports=router