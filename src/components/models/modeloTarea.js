const {
    Schema,
    model
} = require('mongoose')

require('../models/modeloUsuarios')
const TareSchema = new Schema({

    titulo: {
        type: String,
        min: 8,
        require
    },
    descripcion: {
        type: String,
        min: 10,
        require
    },
    estado: {
        type: String,
        min: 15,
        require
    },
    isActive: {
        type: Boolean,
        default: true

    },
    role: {
        type: String,
        default:'default_user'
    },

    idUser: {
        type:Schema.ObjectId,
        ref:'usuario',
        required:true
    }

})


module.exports = model('tarea', TareSchema)