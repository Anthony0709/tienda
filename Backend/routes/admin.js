const express = require('express');
const router = express.Router();

const verificarAdmin = require('../middleware/admin');

const Usuario = require('../models/Usuario');

router.get('/test', verificarAdmin, (req, res) => {
  res.json({
    mensaje: 'Admin OK'
  });
});

// Obtener usuarios
router.get('/usuarios', async (req, res) => {

  try {

    const usuarios = await Usuario.find()
      .select('-password');

    res.json(usuarios);

  } catch (error) {

    res.status(500).json({
      mensaje: 'Error al obtener usuarios'
    });

  }

});

// Cambiar rol
router.put('/usuarios/:id/rol', async (req, res) => {

  try {

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select('-password');

    res.json(usuario);

  } catch (error) {

    res.status(500).json({
      mensaje: 'Error al cambiar rol'
    });

  }

});

// Eliminar usuario
router.delete('/usuarios/:id', async (req, res) => {

  try {

    await Usuario.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: 'Usuario eliminado'
    });

  } catch (error) {

    res.status(500).json({
      mensaje: 'Error al eliminar usuario'
    });

  }

});

module.exports = router;