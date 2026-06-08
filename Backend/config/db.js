const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.4.4']);

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB conectado');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = conectarDB;