// SDK de Mercado Pago
const Producto = require('../models/modeloProductos')
const CtrlMercadoPago = {}
const mercadopago = require("mercadopago");

// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-6496506201316074-120218-e5d4b272fbd8e964add03499b5978d00-291748207",
});

CtrlMercadoPago.post = async (req, res) => {
  // Crea un objeto de preferencia
  const producto = Producto.findOne()
 

    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        }
      ],
      back_urls: {
        "success": "http://localhost:3000/homeCliente",
        "failure": "http://localhost:8080/feedback",
        "pending": "http://localhost:8080/feedback"
      },
      auto_return: "approved",
    };
  
    mercadopago.preferences.create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id
        });
      }).catch(function (error) {
        console.log(error);
      });
 

};




module.exports = CtrlMercadoPago