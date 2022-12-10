
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
    
    sql= "SELECT * FROM v07_dame_camas where Servicio <> '07-RES' AND SidMedico =" + req.query.medico;
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


export const getAltasPrevistas = async (req, res) => {

    console.log('Altas previstas en planta durante la semana');
    
    const pool = await getConnection();
    var sql="";

    if (!req.query.fechaInicio) {
        res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error falta la fecha de inicio"
                    
        }));
        return
    }

    if (!req.query.planta) {

        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            status:500,
            message:"Error falta la planta"
            
        }));
        return
    }

    const fecha = req.query.fechaInicio.substr(6,2) + '/' + req.query.fechaInicio.substr(4,2) + '/' + req.query.fechaInicio.substr(0,4);

    sql= "SELECT * FROM v07_pnl_altas_previstas where fecha >= TO_DATE('" + fecha + "','dd/mm/yyyy') and Planta ='" + req.query.planta + "'"
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando lista de altas previstas",
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

