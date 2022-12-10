
var jwt = require('jsonwebtoken');
var config =  require ('../config.js')


function auth(role) {

    return async function(req, res, next) {

        var token;
        var payload;

        if (!req.headers.authorization) {
            return res.status(401).send({message: "No autorizado"})
            }
            token=req.headers.authorization.split(' ')[1];
            
            try {
            payload=jwt.verify(token, config.jwtSecretKey);
            
            }catch (e) {
            if (e.name === 'TokenExpiredError') {
            res.status(401).send({message: "Autorización expirada. Contacte con HospitalTenerife@sjd.es"})
            } else {
            res.status(401).send({message: "Autorización invalida"})
            }
            return
            }
        if (!role || role === payload.role ) {
            req.user = {
                email: payload.sub,
                role: payload.role
            };
            next();
        } else {
            res.status(401).send({message: 'No estas autorizado'});

        }

    }

}
module.exports = auth;
