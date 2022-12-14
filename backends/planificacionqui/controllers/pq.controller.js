
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

    if (body.DESCRIPCION && body.ALIAS && body.TIPO && body.facility ) {
        var sql = "INSERT INTO pq_ubicaciones (uuid, facility, descripcion, alias, tipo, activa_sn, servicio) VALUES('" + uuidv4() + "'," + body.facility +
                  ",'" + body.DESCRIPCION + "','" + body.ALIAS + "'," + body.TIPO + ",'" + (body.ACTIVA ==="0"? 'N':'S') + "'," +
                  (body.SERVICIO==null  ? null + ")"  : "'" + body.SERVICIO + "')")
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

export const getServicios = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.facility);
    
    sql= "SELECT * FROM  V07_PQ_SERVICIOS_QUI where facility =" + req.params.facility;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando servicios quirúrgicos",
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

export const insertarServicioQUI=async (req, res) => {


    var body = req.body;

    if (body.facility && body.servicio) {
        var sql = "INSERT INTO pq_servicios_qui (facility, xkey) VALUES(" + body.facility + ",'" + body.servicio + "')"
    }
    else {
        
        res.status(500).send('Error al insertar servicio. Faltan campos en el cuerpo del mensaje');
        return;
    }
    const pool = await getConnection();
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar servicio');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })

}


export const borrarServicioQUI=async (req, res) => {


    var body = req.body;

    if (body.facility && body.servicio) {
        var sql = "DELETE FROM pq_servicios_qui WHERE facility=" + body.facility + " AND xkey='" + body.servicio + "'"
    }
    else {
        
        res.status(500).send('Error al body servicio. Faltan campos en el cuerpo del mensaje');
        return;
    }
    const pool = await getConnection();
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al borrar servicio');
            return;
                }
        res.status(200).send('Borrado correcto');
            return;

    })

}