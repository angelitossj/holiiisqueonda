const express = require('express')
const cors =require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()
const connectDB=require('./conexion')



connectDB()

const app = express();


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


// Iniciar servidor
app.listen(port, console.log(`
    Servidor iniciado en: http://localhost:${port}
`))
