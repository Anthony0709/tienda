const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({

  // 👤 ahora el pedido pertenece a un usuario real
  usuario: {
    type: String,
    required: true
  },

  productos: [
    {
      producto: Object,
      cantidad: Number
    }
  ],

  total: Number,

  estado: {
    type: String,
    default: 'Pendiente'
  },

  fecha: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Pedido', pedidoSchema);