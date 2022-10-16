var oracledb = require('oracledb');
var oracle =  require('../database/connection.js')


const get = async(req, res, next) =>{
   
    
    const pool = await oracle.getConnection();
    pool.execute('select column1 from jsao_protected_things',[], {outFormat: oracledb.OBJECT}, 
    function(err,result) {
        if (err) {
            console.log ('Error el ejecutar la query:' + err.message)
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Error private things",
                detailed_message: err.message
            }));
        }
        else {
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result.rows));
        }
    }
    );
} 
module.exports.get = get;