
import { getConnection } from '../database/connection';
import {v4 as uuidv4} from 'uuid';
var oracledb = require("oracledb");


export const getTiposRecurso = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.facility);
    
    sql= "SELECT * FROM  V07_PQ_TIPOS_RECURSO" 
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando tipos recurso",
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


export const getRecursos = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.facility);
    
    sql= "SELECT * FROM  V07_PQ_RECURSOS where facility =" + req.params.facility;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando recursos",
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


export const postRecurso = async (req, res) => {

    console.log('Insertar recurso');
    console.log(req.body);

    const pool = await getConnection();

    var body = req.body;

    if (body.DESCRIPCION && body.ALIAS && body.TIPO && body.facility ) {
        var sql = "INSERT INTO pq_recursos (uuid, facility, descripcion, alias, tipo, activo_sn) VALUES('" + uuidv4() + "'," + body.facility +
                  ",'" + body.DESCRIPCION + "','" + body.ALIAS + "'," + body.TIPO + ",'" + (body.ACTIVO ==="0"? 'N':'S') + "')"
    }
    else {
        res.status(500).send('Error al insertar recursos. Faltan campos en el cuerpo del mensaje');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar recurso');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })
}