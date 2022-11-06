const router =require('express').Router()

const {iniciarSesion}=require("../controllers/authUsuario")



router.post("/login",iniciarSesion)



module.exports=router;