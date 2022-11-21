const {
    Schema,
    model
} = require('mongoose')

const ProveedoresSchema = new Schema({

    nombreOrazonSocial: {
        type: String,
        min: 6,
        max: 20


    },
    usuario:{
        type: String,
        required:true
        
    },

    cedulaIdentidad: {
        type: String,
        required: true
    },
    DomicilioEmpresa: {
        type: String,
        required: true


    },
    telefono: {
        type: Number,
        required: true



    },
    email: {
        type: String,
        min: 15,
        max: 30
    },
    password: {
        type: String,
        min: 19,
        max: 50

    },
    categorias:{
        type: String,
        required:true
    },
    isActive: {
        type: Boolean,
        default: true

    },
    role: {
        type: String,
        default: 'proveedor'
    },







}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("proveedores", ProveedoresSchema)