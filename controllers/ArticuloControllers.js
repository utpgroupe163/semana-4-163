const {Articulo} = require('../models');
// const Categoria = require('../models').Categoria;

exports.add = async (req, res, next) => {
    try {
        const article = await Articulo.findOne({
            where: {
                nombre: req.body.nombre
            }
        });
        if (article) {
            res.status(409).send({error:'Artículo ya existe'})
        } else {
            const article = await Articulo.create(req.body);
            res.status(200).send(article);
        }
    } catch (error) {
        res.status(500).send({error:'Error->'});
        next(error);
    }
};
exports.list = async (req, res, next) => {
    try {
        const article = await Articulo.findAll(
        // {
        //     include: [{
        //         model: Categoria,
        //         as: 'categoria'
        //     }],
        // }
        );
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).send({error:'No hay articulos'})
        }
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const article = await Articulo.update({
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            idcategoria: req.body.idcategoria
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
exports.activate = async (req, res, next) => {
    try {
        const article = await Articulo.update({
            estado: 1
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
exports.deactivate = async (req, res, next) => {
    try {
        const article = await Articulo.update({
            estado: 0
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
