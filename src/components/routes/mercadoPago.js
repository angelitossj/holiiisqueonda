const router =require('express').Router()

const {post}=require("../utils/mercadoPago")



router.post("/mercadoPago",post)



module.exports=router;