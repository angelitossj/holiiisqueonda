const router =require('express').Router()

const {iniciarSesion}=require("../controllers/authProveedor")



router.post("/sesion",iniciarSesion)



module.exports=router;