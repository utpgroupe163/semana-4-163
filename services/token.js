const jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async (token) => {
    let localID = null;
    try {
        const {id} = await token.decode(token);
        localID = id;
    } catch (error) {
        return false;
    }
    const user =await models.user.findOne({where:{
        id: localID,
        estado:1
    }});
    if (user){
        const token = await encode(user);
        return token;
    }else{
        return false;
    }
}

module.exports = {

    //generar el token
    encode: async(user) => {
        const token = jwt.sign({
            id: user.id,
            nombre: user.nombre,
            rol: user.rol,
            email: user.email,
            estado: user.estado
        },'hola soy una cadena secreta',
        {
            expiresIn:86400
        }) ;
        return token;
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            // return res.status(403).send(token);
            const{id} = await jwt.verify(token,'hola soy una cadena secreta');
            
            const user = await models.Usuario.findOne({ where:{
                id:id,
                estado: 1
            }});
            if (user){
                return user;
            }else{
                return false ;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}