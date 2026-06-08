require('dotenv').config();

const express = require('express');
const cors = require('cors');

const conectarDB = require('./config/db');

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/productos', require('./routes/productos'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/usuarios', require('./routes/usuarios'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});