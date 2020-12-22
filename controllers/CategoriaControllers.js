const {Categoria} = require('../models');

exports.add = async (req, res, next) => {
    try {
        const category = await Categoria.findOne({
            where: {
                nombre: req.body.nombre
            }
        });
        if (category) {
            res.status(409).send({error:'Categoría ya existe'})
        } else {
            //    req.body.password = bcryptjs.hashSync(req.body.password,10);
            const category = await Categoria.create(req.body);
            res.status(200).send(category);
        }
    } catch (error) {
        res.status(500).send({error:'Error->'});
        next(error);
    }
};
exports.list = async (req, res, next) => {
    try {
        const category = await Categoria.findAll();
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).send({error:'No hay categorias'})
        }
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const category = await Categoria.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
exports.activate = async (req, res, next) => {
    try {
        const category = await Categoria.update({
            estado: 1
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
exports.deactivate = async (req, res, next) => {
    try {
        const category = await Categoria.update({
            estado: 0
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
