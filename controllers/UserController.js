const bcrypt = require('bcryptjs');
const  { Usuario }  = require('../models');
const tokenServices = require('../services/token')

exports.login = async(req, res, next) => {
    try {
        const user = await Usuario.findOne({where : {email: req.body.email, estado: 1}});
        if(user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password , user.password);
            if(passwordIsValid){
                const token = await tokenServices.encode(user);
                res.status(200).send({
                    auth: true,
                    tokenReturn: token
                })

                }else{
                    res.status(401).json({
                    error: 'Error en la validación'
                    })

                }

            }else{
                res.status(404).json({
                error: 'Error en la validación'
                   })
                }
            } catch (error) {
            res.status(500).send({
            message: 'Error->'
        })
        next (error);

    }
};
exports.register = async(req, res, next) =>{
    try {
        const user = await Usuario.create({
            nombre: req.body.nombre, 
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password, 10),
            rol: req.body.rol,
            estado: 1
        })
     
        res.status(200).json(user)

    }catch (error){
        
        res.status(500).send({
            message: 'Error->'
        })
        next (error);

        }
    };
exports.listar = async(req, res, next) =>{
    try{
            const users = await Usuario.findAll();

            res.status(200).json(users);
        

    }catch (error){

        res.status(500).send({
            message: 'Error->'
        })
        next (error);

    }
}; 
exports.actualizar = async(req, res, next) =>{
    try {
        const user = await Usuario.update({nombre: req.body.nombre, rol: req.body.rol}, { where: {email: req.body.email} } );

        res.status(200).send()

    }catch (error){

            next(error);
        }
    };
exports.activar = async(req, res, next) => {
try {
    const user = await Usuario.update({estado:1}, {where: {id:req.body.id}});
    res.status(200).send()
    
} catch (error) {
    next(error);
}
};
exports.desactivar = async(req, res, next) => {
    try {
        const user = await Usuario.update({estado:0}, {where: {id:req.body.id}});
    res.status(200).send()
        
    } catch (error) {
        next(error);
    }
    };