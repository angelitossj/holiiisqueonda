// SDK de Mercado Pago
const Producto= require('../models/modeloProductos')
const CtrlMercadoPago={}
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-6496506201316074-120218-e5d4b272fbd8e964add03499b5978d00-291748207",
});

CtrlMercadoPago.get=async(req,res)=>{
    // Crea un objeto de preferencia
const producto = Producto.findOne()
let preference = {
    items: [
      {
        title: producto.nombreProducto,
        unit_price: producto.precioUnitario,
        imagen:producto.imagen
        // quantity: 1,
      },
    ],
  };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
}
