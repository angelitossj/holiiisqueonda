const router = require('express').Router()

const {
getProveedores,
postProveedores,
putProveedores,
deleteProveedores,
getProveedoresCategorias,
getProveedoresId





}=require("../controllers/ctrlProveedores")
const validarProveedores=require('../middlewares/validar-jwt-proveedores')


router.get("/proveedores",getProveedores)
router.get("/proveedores/:idProveedor",getProveedoresId)

router.get("/proveedores",getProveedoresCategorias)
router.post("/proveedores",postProveedores)
router.get("/proveedores/:idProveedores",getProveedores)
router.put("/proveedores/:idProveedores",[validarProveedores],putProveedores)
router.delete("/proveedores/:idProveedores",deleteProveedores)
// router.delete("/Cliente/:idCliente",[validarJWT],deleteCliente)


module.exports=router