const router =require('express').Router()

const {iniciarSesion}=require("../controllers/authCliente")



router.post("/sesion",iniciarSesion)



module.exports=router;