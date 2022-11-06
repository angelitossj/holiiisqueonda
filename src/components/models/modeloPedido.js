const {
    Schema,
    model
} = require('mongoose')

const UsuarioSchema = new Schema({


  
  idCliente: {
    type:Schema.ObjectId,
    ref:'cliente',
    required:true
},

idProducto: {
    type:Schema.ObjectId,
    ref:'producto',
    required:true
}







}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("usuario", UsuarioSchema)