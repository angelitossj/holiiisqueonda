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
    idProveedor: {
        type: {}
        
    },
    idProducto: {
        type: {}
        
    },
    cantidad: {
        type: String
    },

    nombreProducto: {
        type: String
        
    },
    // idProducto: {
    //     type: [Schema.ObjectId],
    //     ref: 'producto',
    //     required: true
    // }





}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("publicaciones", publicacionesSchema)