const router = require('express').Router()

const {
getCliente,
postCliente,
putCliente,
deleteCliente,
getClienteId





}=require("../controllers/controladorCliente")
const ValidarCliente=(require('../middlewares/validar-cliente'))


router.get("/cliente",[ValidarCliente],getCliente)
router.post("/cliente",[ValidarCliente],postCliente)
router.get("/cliente",[ValidarCliente],getCliente)
router.get("/cliente/:idCliente",[ValidarCliente],getClienteId)
router.put("/cliente/:idCliente",[ValidarCliente],putCliente)
router.delete("/cliente/:idCliente",[ValidarCliente],deleteCliente)
// router.delete("/Cliente/:idCliente",[validarJWT],deleteCliente)


module.exports=router