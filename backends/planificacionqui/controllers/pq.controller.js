
import { getConnection } from '../database/connection';
var oracledb = require("oracledb");

export const getUbicaciones = async (req, res) => {

    const pool = await getConnection();
    var sql="";

    
    sql= "SELECT * FROM com_personal where sid =" + req.params.sid
    
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando médico",
                    detailed_message: err.message
                }));
            }
            else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(result.rows));
            }
        }
        )
}

export const getTiposUbicacion = async (req, res) => {

    const pool = await getConnection();
    var sql="";

    
    sql= "SELECT * FROM V07_PQ_TIPOS_UBICACION"
    
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando tipos de ubicacion",
                    detailed_message: err.message
                }));
            }
            else {
                
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(result.rows));
            }
        }
        )
}

