const jwt = require('jsonwebtoken');

const verificarAdmin = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      mensaje: 'Sin token'
    });
  }

  try {

    const decoded = jwt.verify(
      token.split(' ')[1],
      process.env.JWT_SECRET
    );

    // 🔐 Verificar rol
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        mensaje: 'No autorizado'
      });
    }

    // Guardamos usuario para usarlo después si hace falta
    req.usuario = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      mensaje: 'Token inválido'
    });

  }

};

module.exports = verificarAdmin;