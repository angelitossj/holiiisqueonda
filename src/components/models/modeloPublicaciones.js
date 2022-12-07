const {
    Schema,
    model
} = require('mongoose')

const publicacionesSchema = new Schema({


    // descripcion: {
    //     type: String,
    //     // required: true
    // },
    // categoria: {
    //     type: String,
    //     // required: true
    // },
    // productos: {
    //     type: [{}]
    // },


    // isActive: {
    //     type: Boolean,
    //     default: true

    // },
    pedidos: {
        type: Array
    },

    idProveedor: {
        type: String
        
    },
    idProducto: {
        type: String
        
    },
    cantidad: {
        type: String
    },

    nombreProducto: {
        type: String
        
    },
    idCliente: {
        type:Schema.ObjectId,
        ref:'cliente',
        
    }





}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("publicaciones", publicacionesSchema)