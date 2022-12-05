const router = require('express').Router()

const {
getPublicaciones,
postPublicaciones,
putPublicaciones,
deletePublicaciones,
getPublicacionesIdCliente





}=require("../controllers/ctrlPublicaciones")
const validarPublicacion=require('../middlewares/validar-cliente')


router.get("/publicaciones",getPublicaciones)
router.post("/publicaciones",postPublicaciones)
router.get("/publicaciones",[validarPublicacion],getPublicaciones)
router.get('/publicaciones/cliente',[validarPublicacion],getPublicacionesIdCliente)
router.get("/publicaciones/:idpublicacion",[validarPublicacion],getPublicaciones)
router.put("/publicaciones/:idpublicacion",[validarPublicacion],putPublicaciones)
router.delete("/publicaciones/:idpublicacion",deletePublicaciones)
// router.delete("/Cliente/:idCliente",[validarJWT],deleteCliente)


module.exports=router