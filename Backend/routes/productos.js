const express = require('express');
const Producto = require('../models/Producto');

const router = express.Router();

const verificarAdmin = require('../middleware/admin');


// OBTENER TODOS

router.get('/', async (req, res) => {

    try {

        const productos = await Producto.find();

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener productos'
        });

    }

});


// CREAR PRODUCTO

router.post('/',verificarAdmin, async (req, res) => {

    try {

        const existe = await Producto.findOne({
            nombre: req.body.nombre
        });

        if (existe) {

            return res.status(400).json({
                mensaje: 'El producto ya existe'
            });

        }

        const producto = new Producto(req.body);

        await producto.save();

        res.status(201).json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al crear producto'
        });

    }

});


// OBTENER PRODUCTO POR ID


router.get('/:id', async (req, res) => {

    try {

        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al buscar producto'
        });

    }

});


// ACTUALIZAR PRODUCTO
router.put('/:id', verificarAdmin, async (req, res) => {

    try {

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!producto) {

            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });

        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar producto'
        });

    }

});


// ELIMINAR PRODUCTO
router.delete('/:id',verificarAdmin, async (req, res) => {

    try {

        const producto = await Producto.findByIdAndDelete(
            req.params.id
        );

        if (!producto) {

            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });

        }

        res.json({
            mensaje: 'Producto eliminado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar producto'
        });

    }

});

module.exports = router;