var oracledb = require('oracledb');
var oracle =  require('../database/connection.js')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var config= require('../config.js')


const  post = async (req, res, next) => {

    var user = {
        email: req.body.email
    };
    var unhashedPassword = req.body.password;
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(unhashedPassword, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.hashedPassword = hash;

            insertUser(user, function(err, user) {
                var payload;

                if (err) {
                    return next(err);
                }

                payload = {
                    sub: user.email,
                    role: user.role
                };

                res.status(200).json({
                    user: user,
                    token: jwt.sign(payload, config.jwtSecretKey, {expiresIn:'100d'})
                });
            });
        });
    });
}

module.exports.post =post;


async function insertUser(user, cb) {

    const pool = await oracle.getConnection();
    
    sql = 'insert into jsao_users (id,email,password,role) ' +
          'values (jsao_users_seq.nextval,' +
          ':email,' +
          ':password,' +
          '\'BASE\' )' +
          'returning ' +
          'id,' +
          'email, ' +
          'role ' +
          'into ' +
          ':rid, ' +
          ':remail, ' +
          ':rrole'

          console.log(sql);
    pool.execute(sql,
                {
                    email: user.email.toLowerCase(),
                    password: user.hashedPassword,
                    rid: {
                        type: oracledb.NUMBER,
                        dir: oracledb.BIND_OUT
                    },
                    remail: {
                        type: oracledb.STRING,
                        dir: oracledb.BIND_OUT
                    },
                    rrole: {
                        type: oracledb.STRING,
                        dir: oracledb.BIND_OUT
                    }

                },
                {
                    autoCommit: true
                },
                function(err, results){
                    if (err) {
                        console.error(err.message);
                        return cb(err)
                
                }
                cb(null, {
                        id: results.outBinds.rid[0],
                        email: results.outBinds.remail[0],
                        role: results.outBinds.rrole[0]
                    });
              })        
        }   
    
