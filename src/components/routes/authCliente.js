const router =require('express').Router()

const {iniciarSesion}=require("../controllers/authCliente")



router.post("/log",iniciarSesion)



module.exports=router;