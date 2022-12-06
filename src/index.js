const express = require('express')
const cors =require('cors')
const morgan = require('morgan')
const path = require('path')
const {Server} =require ('socket.io')
const app = express();
const http = require('http')
require('dotenv').config()

const server=http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'*'
    }
})
const connectDB=require('./conexion')



connectDB()



// configuraciones
const port=process.env.PORT ||4000;

// MIDDLEWARE
app.use(cors())
app.use(morgan("combined"))
app.use(express.json())

// rutas
// app.use(require("./components/routes/rutasUsuarios"))
// app.use(require("./components/routes/rutasTareas"))
// app.use(require("./components/routes/authRutas"))
app.use(require('./components/routes/rutasClientes'))
app.use(require('./components/routes/rutasProveedores'))
app.use(require('./components/routes/authProveedores'))
app.use(require('./components/routes/rutasProductos'))
app.use(require('./components/routes/rutasPublicaciones'))
app.use(require('./components/routes/authCliente'))





io.on('connection',(socket)=>{
    console.log(socket.id)
   
    socket.on('message',(message)=>{
        socket.broadcast.emit('message',{
            body:message,
            from : socket.id
        })
    })
})
// Iniciar servidor
server.listen(port, console.log(`
    Servidor iniciado en: http://localhost:${port}
`))
