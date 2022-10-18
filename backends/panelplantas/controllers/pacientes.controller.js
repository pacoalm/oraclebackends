

import { getConnection } from '../database/connection';
var oracledb = require("oracledb");

export const getProtocoloCaidas= async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.subencounter);
    
    sql= "SELECT subencounter FROM  pnl_protocolo_caidas where subencounter =" + req.params.subencounter;
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

export const insertProtocoloCaidas = async (req, res) =>{

    console.log('Insertar en protocolo de caidas');
    console.log(req.body);

    const pool = await getConnection();
   
    var body = req.body;

    if (body.subencounter) {
        var sql = "INSERT INTO pnl_protocolo_caidas VALUES(" + body.subencounter + ")"
    }
    else {
        res.status(500).send('No se ha proporcionado subepisodio');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar subencounter');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })
   
}

/* Borra registro del protocolo de caidas */
export const deleteProtocoloCaidas = async (req, res) =>{

    console.log('Borrar protocolo de caidas');
    console.log(req.body);

    const pool = await getConnection();
   
    var body = req.body;

    if (body.subencounter) {
        var sql = "DELETE FROM pnl_protocolo_caidas WHERE subencounter=" + body.subencounter 
    }
    else {
        res.status(500).send('No se ha proporcionado subepisodio');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al borrar subencounter');
            return;
                }
        res.status(200).send('Borrado correcto');
            return;

    })
   
}

/* Obtener registros de evolución médica */


export const getEvolucionesMedicas= async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.subencounter);
    
    sql= "SELECT * FROM  V07_PNL_DAME_EVOL_PAC where subencounter =" + req.params.subencounter;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando evoluciones del paciente",
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
