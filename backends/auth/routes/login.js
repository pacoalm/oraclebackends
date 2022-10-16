var oracledb = require('oracledb');
var oracle =  require('../database/connection.js')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config.js');


const post = async(req, res, next) => {

    const pool = await oracle.getConnection();
    
    pool.execute(
                'select id as "id", ' +
                '   email as "email", ' +
                '   password as "password", ' +
                '   role as "role" ' +
                'from jsao_users ' +
                'where email = :email',
                {
                    email: req.body.email.toLowerCase()
                },
                {
                    outFormat: oracledb.OBJECT
                },
                function(err, results){
                    var user;

                    if (err) {
                        pool.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return next(err);
                    }

                    user = results.rows[0];

                    bcrypt.compare(req.body.password, user.password, function(err, pwMatch) {
                        var payload;

                        if (err) {
                            return next(err);
                        }

                        if (!pwMatch) {
                            res.status(401).send({message: 'Invalid email or password.'});
                            return;
                        }

                        payload = {
                            sub: user.email,
                            role: user.role
                        };

                        res.status(200).json({
                            user: user,
                            token: jwt.sign(payload, config.jwtSecretKey,{expiresIn: '1d'})
                        });
                    });

                    pool.release(function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                });
}
module.exports.post = post;
