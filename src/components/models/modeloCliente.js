const {
    Schema,
    model
} = require('mongoose')

const schemaCliente = new Schema({
    nombreCliente: {
        type: String,
        required:true
    },
    usuario: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,

        required:true
    },
    isActive: {
        type: Boolean,
        default: true

    },
    role: {
        type: String,
        default:'cliente'
    }







})




module.exports = model('cliente', schemaCliente)