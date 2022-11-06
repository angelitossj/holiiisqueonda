const {
    Schema,
    model
} = require('mongoose')

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        min: 6,
        max: 20


    },
    usuario: {
        type: String,
        mix: 10,
        require
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
    isActive: {
        type: Boolean,
        default: true

    },
    role: {
        type: String,
        default:'default_user'
    }







}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("usuario", UsuarioSchema)