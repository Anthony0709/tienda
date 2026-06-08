const jwt = require('jsonwebtoken');

// Middleware para validar token
const verificarToken = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'No hay token' });
  }

  try {

    // quitamos "Bearer "
    const tokenReal = token.split(' ')[1];

    const decoded = jwt.verify(tokenReal, process.env.JWT_SECRET);

    // guardamos usuario en request
    req.usuarioId = decoded.id;

    next();

  } catch (error) {

    res.status(401).json({ mensaje: 'Token inválido' });

  }
};

module.exports = verificarToken;