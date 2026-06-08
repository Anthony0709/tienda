const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/auth');
const Usuario = require('../models/Usuario');

const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

// CREAR PEDIDO (PROTEGIDO)
router.post('/', verificarToken, async (req, res) => {

  try {

    const { productos, total } = req.body;

    // 🔥 obtener usuario del token
    const usuario = req.usuarioId;

    // validar stock
    for (let item of productos) {

      const productoDB = await Producto.findById(item.producto._id);

      if (!productoDB) {
  return res.status(404).json({
    mensaje: 'Producto no encontrado'
  });
}

if (productoDB.stock < item.cantidad) {
  return res.status(400).json({
    mensaje: `Stock insuficiente para ${productoDB.nombre}`
  });
}

    }

    // descontar stock
    for (let item of productos) {
      await Producto.findByIdAndUpdate(item.producto._id, {
        $inc: { stock: -item.cantidad }
      });
    }

    // crear pedido con usuario
    const pedido = new Pedido({
      usuario,
      productos,
      total
    });

    await pedido.save();

    res.status(201).json(pedido);

  } catch (error) {

    res.status(500).json({ mensaje: 'Error al crear pedido' });

  }

});

// OBTENER PEDIDOS
router.get('/', async (req, res) => {

  const pedidos = await Pedido.find().sort({ fecha: -1 });

  res.json(pedidos);

});

// obtener pedidos del usuario logueado
router.get('/mis-pedidos', verificarToken, async (req, res) => {

  try {

    const pedidos = await Pedido.find({
      usuario: req.usuarioId
    }).sort({ fecha: -1 });

    res.json(pedidos);

  } catch (error) {

    res.status(500).json({ mensaje: 'Error al obtener pedidos' });

  }

});

// CAMBIAR ESTADO PEDIDO
router.put('/:id/estado', async (req, res) => {

  try {

    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      {
        estado: req.body.estado
      },
      {
        new: true
      }
    );

    res.json(pedido);

  } catch (error) {

    res.status(500).json({
      mensaje: 'Error al actualizar estado'
    });

  }

});

module.exports = router;