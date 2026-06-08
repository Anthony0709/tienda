// routes/auth.js

const express = require('express');
const router = express.Router();

// Para encriptar contraseñas
const bcrypt = require('bcryptjs');

// Para crear tokens de sesión
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

// Registrar usuario nuevo
router.post('/register', async (req, res) => {

  try {

    const { nombre, email, password } = req.body;

    // 1. Verificar si el usuario ya existe
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
      return res.status(400).json({
        mensaje: 'El usuario ya existe'
      });
    }

    // 2. Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // 3. Crear usuario
    const usuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptada
    });

    await usuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente'
    });

  } catch (error) {

    res.status(500).json({
      mensaje: 'Error en registro'
    });

  }

});

// Login de usuario
router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    // 1. Buscar usuario
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    // 2. Comparar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(400).json({
        mensaje: 'Contraseña incorrecta'
      });
    }

    // 3. Crear token JWT
    const token = jwt.sign(
  {
    id: usuario._id,
    email: usuario.email,
    role: usuario.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1d'
  }
);

    res.json({
  token,
  usuario: {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    role: usuario.role
  }
});

  } catch (error) {

    res.status(500).json({
      mensaje: 'Error en login'
    });

  }

});

module.exports = router;