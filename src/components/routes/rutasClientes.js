const router = require('express').Router()

const {
getCliente,
postCliente,
putCliente,
deleteCliente,
getClienteId





}=require("../controllers/controladorCliente")



router.get("/cliente",getCliente)
router.post("/cliente",postCliente)
router.get("/cliente",getCliente)
router.get("/cliente/:idCliente",getClienteId)
router.put("/cliente/:idCliente",putCliente)
router.delete("/cliente/:idCliente",deleteCliente)
// router.delete("/Cliente/:idCliente",[validarJWT],deleteCliente)


module.exports=router