const {Usuario} = require('../models');
const bcryptjs = require('bcryptjs');
// var jwt =require('jsonwebtoken');
const tokenService =require('../services/token')

exports.login = async (req, res, next) => {
    try {
        const user = await Usuario.findOne({where:{
            email: req.body.email,
            estado : 1
        } });
        if(user){
            const passwordIsValid = bcryptjs.compareSync(req.body.password,user.password);
            if(passwordIsValid){
                const token = await tokenService.encode(user);
                res.status(200).send({
                    auth: true, 
                    // user : user,
                    tokenReturn:token})
            }else{
                res.status(401).send({error:'Invalid Password'})
            }
        }else{
            res.status(404).send({error:'User Not Found'})
        }

    } catch (error) {
        res.status(500).send({error:'Error->'});
        next(error);
    }
};
exports.register = async (req, res, next) => {
     try {
        const user =await Usuario.findOne({where:{email:req.body.email}});
        if(user){
            res.status(409).send({error:'Email ya existe'})
        }else{
            req.body.password = bcryptjs.hashSync(req.body.password,10);
            const user = await Usuario.create(req.body);
            res.status(200).send(user);
        }
     } catch (error) {
         res.status(500).send({error:'Error->'});
         next(error);
     }
 };
exports.list = async (req, res, next) => {
    try {
        const user = await Usuario.findAll();
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({error:'No hay Usuarios'})
        }
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const user = await Usuario.update({
            nombre: req.body.nombre,
            rol: req.body.rol,
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({error:'Error->'})
        next(error);
    }
};