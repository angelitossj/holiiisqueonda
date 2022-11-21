const router =require('express').Router()

const {iniciarSesion}=require("../controllers/authProveedor")



router.post("/login",iniciarSesion)



module.exports=router;