const {
    Schema,
    model
} = require('mongoose')

const publicacionesSchema = new Schema({


    descripcion: {
        type: String,
        required: true
    },


    isActive: {
        type: Boolean,
        default: true

    },
    idCliente: {
        type: Schema.ObjectId,
        ref: 'cliente',
        required: true
    },
    idProducto: {
        type: [Schema.ObjectId],
        ref: 'producto',
        required: true
    }





}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("publicaciones", publicacionesSchema)