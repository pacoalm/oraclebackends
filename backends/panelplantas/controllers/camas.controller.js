
import { getConnection } from '../database/connection';
var oracledb = require("oracledb");

export const getCamas = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.query.planta);
    
    sql= "SELECT * FROM v07_dame_camas where planta ='" + req.query.planta + "'";
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando lista de camas",
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

export const getCamasMed = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.query.medico);
    
    sql= "SELECT * FROM v07_dame_camas where SidMedico =" + req.query.medico;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando lista de camas del médico",
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
