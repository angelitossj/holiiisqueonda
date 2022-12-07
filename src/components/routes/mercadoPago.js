const router =require('express').Router()

const {get}=require("../controllers/mercadoPago")



router.get("/mercadoPago",get)



module.exports=router;