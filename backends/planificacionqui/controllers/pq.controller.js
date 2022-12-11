
import { getConnection } from '../database/connection';
import {v4 as uuidv4} from 'uuid';

var oracledb = require("oracledb");

export const getUbicaciones = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.facility);
    
    sql= "SELECT * FROM  V07_PQ_ubicaciones where facility =" + req.params.facility;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando ubicaciones quirúrgicas",
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

export const postUbicacion = async (req, res) => {

    console.log('Insertar ubicación');
    console.log(req.body);

    const pool = await getConnection();


   
    var body = req.body;

    if (body.descripcion && body.alias && body.tipo & body.activa && body.facility) {
        var sql = "INSERT INTO pq_ubicaciones (uuid, facility, descripcion, alias, tipo, activa_sn) VALUES('" + uuidv4() + "'," + body.facility +
                  ",'" + body.descripcion + "','" + body.alias + "'," + body.tipo + ",'" + (body.activa===0? 'N':'S') + "')"
    }
    else {
        res.status(500).send('Error al insertar ubicación. Faltan campos en la cabecera');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar ubicación');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })
   
    
   
}

