const router =require('express').Router()

const {iniciarSesion}=require("../controllers/authCliente")



router.post("/sesionCliente",iniciarSesion)



module.exports=router;