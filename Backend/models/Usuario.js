// models/Usuario.js

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // 🔐 Rol del usuario
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);