//Middleware de autenticacion;
const tokenService = require('../services/token');

module.exports = {

    verificarAdministrador: async(req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({error:'No hay token'});
        }else{
            const response = await tokenService.decode(req.headers.token);
            // return res.status(403).send(tokenService.decode.req.headers.token)
            if (response.rol === "Administrador"){
                next();
            }else{
                //return response.rol;
                 return res.status(403).send({error:'No Autorizado 1'});
            }
        }
    },
    verificarVendedor: async(req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({error:'No hay token'});
        }else{
            const response = await tokenService.decode(req.headers.token);
            if (response.rol === "Vendedor" || response.rol === "Administrador"){
                next();
            }else{
                return res.status(403).send({error:'No Autorizado 2'});
            }
        }
    },
    verificarAlmacenero: async(req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({error:'No hay token 3'});
        }else{
            const response =await tokenService.decode(req.headers.token);
            if (response.rol === "Almacenero" || response.rol === "Administrador"){
                next();
            }else{
                return res.status(403).send({error:'No Autorizado 3'});
            }
        }
    },
}