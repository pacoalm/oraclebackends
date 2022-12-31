
import { getConnection } from '../database/connection';
import {v4 as uuidv4} from 'uuid';
import bodyParser from 'body-parser';
var oracledb = require("oracledb");


export const getPlantillas = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.facility);
    
    sql= "SELECT * FROM  V07_PQ_plantillas where facility =" + req.params.facility;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando plantillas",
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



export const postPlantilla = async (req, res) => {

    console.log('Insertar plantilla');
    console.log(req.body);

    const pool = await getConnection();

    var body = req.body;

    if (body.DESCRIPCION && body.facility && body.SEMANAS ) {
        var sql = "INSERT INTO pq_plantillas (uuid, facility, descripcion, servicio, semanas) VALUES('" + uuidv4() + "'," + body.facility +
                  ",'" + body.DESCRIPCION + "','" + body.SERVICIO + "',"  + body.SEMANAS + ")"
    }
    else {
        res.status(500).send('Error al insertar plantillas. Faltan campos en el cuerpo del mensaje');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar plantillas');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })
}


export const postDetallePlantilla = async (req, res) => {

    console.log('Insertar detalle plantilla');
    console.log(req.body);

    const pool = await getConnection();

    var body = req.body;

    if (body.plantilla && body.semana && body.dia && body.turno && body.ubicacion && (body.servicio || body.recurso)) {

        var servicio ;
        var recurso;

        if (body.servicio === null) servicio = null
        else servicio= "'" + body.servicio + "'";

        if (body.recurso === null) recurso = null
        else recurso= "'" + body.recurso + "'";
        
        var sql = "INSERT INTO pq_plantilla_detalle (sid_plantilla, semana, dia, turno, ubicacion, servicio, recurso) VALUES('" + body.plantilla + "'," + 
                   body.semana + ",'" + body.dia + "','"  + body.turno + "','" + body.ubicacion + "'," + servicio + "," + recurso + ")"
    }
    else {
        res.status(500).send('Error al insertar detalle de plantilla. Faltan campos en el cuerpo del mensaje');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar detalle de plantilla');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })
}

export const getDetallePlantilla = async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.facility);
    
    sql= "SELECT * FROM  V07_PQ_detalle_plantilla where sid_plantilla = '" + req.params.sidPlantilla + "'";
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando plantillas",
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

export const deleteDetallePlantilla = async (req, res) => {

    console.log('Borrar detalle plantilla');
    console.log(req.body);

    const pool = await getConnection();

    var body = req.body;

    if (body.plantilla && body.semana && body.dia && body.turno && body.ubicacion && (body.servicio || body.recurso)) {

        var sql = "DELETE FROM pq_plantilla_detalle WHERE sid_plantilla= '" + body.plantilla + "' "  +
        "AND semana =" + body.semana + " "
        "AND dia = '" + body.dia + "' " + 
        "AND turno = '" + body.turno + "' "
        "AND ubicacion = '" + body.ubicacion + "' "
        
        if (body.servicio) {
            sql = sql + "AND servicio='" + body.servicio
        } else {
            sql = sql + "AND recurso='" + body.recurso
        }
        
    }
    else {
        res.status(500).send('Error al borrar detalle de plantilla. Faltan campos en el cuerpo del mensaje');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al borrar detalle de plantilla');
            return;
                }
        res.status(200).send('Borrado correcto');
            return;

    })
}
