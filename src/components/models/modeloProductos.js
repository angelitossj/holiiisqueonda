const {
    Schema,
    model
} = require('mongoose')
require('./modeloProveedores')
const ProductoSchema = new Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    categorias: [{}],
    marca: {
        type: String,
        required: true

    },

    fechaVencimiento: {
        type: String,
        required: true
    },
    paisOrigen: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true

    },
    idProveedor: {
        type: Schema.ObjectId,
        ref: 'proveedores',
        required: true
    }







}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("usuario", ProductoSchema)