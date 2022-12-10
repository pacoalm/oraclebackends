

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

export const getInformes= async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.client);
    
    sql= "SELECT * FROM  V07_PNL_DAME_INFORMES_PAC where client =" + req.params.client;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando informes del paciente",
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

export const getAnaliticas= async (req, res) => {

    const pool = await getConnection();
    var sql="";
    console.log(req.params.client);
    
    sql= "SELECT * FROM  V07_PNL_DAME_ANALITICAS where client =" + req.params.client;
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando informes del paciente",
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

export const quitarMarcaNuevo = async (req, res) =>{

    console.log('Quitar la marca de nuevo paciente');
    console.log(req.body);

    const pool = await getConnection();
   
    var body = req.body;

    if (body.subencounter) {
        var sql = "INSERT INTO pnl_nuevos_ingresos VALUES(" + body.subencounter + ")"
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
            res.status(500).send('Error al desmarcar como nuevo ingreso');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })
   
}



/* Borra fecha */
export const deleteAltaPrevista = async (req, res) =>{

    console.log('Borrar fecha de alta prevista');
    console.log(req.body);

    const pool = await getConnection();
   
    var body = req.body;

    if (body.subencounter) {
        var sql = "DELETE FROM pnl_altas_previstas WHERE subencounter=" + body.subencounter 
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
            res.status(500).send('Error al borrar alta prevista');
            return;
                }
        res.status(200).send('Borrado correcto');
            return;

    })
   
}



export const insertarAltaPrevista = async (req, res) =>{

    console.log('Insertar alta prevista');
    console.log(req.body);

    const pool = await getConnection();
   
    var body = req.body;

    if (body.subencounter && body.fechaPrevista && body.cama) {
        var sql = "INSERT INTO pnl_altas_previstas (subencounter, fecha, cama ) VALUES(" + body.subencounter + ",TO_DATE('" + body.fechaPrevista + "','dd/mm/yyyy hh24:mi'),'" + body.cama +  "')" 
    }
    else {
        res.status(500).send('Errra al insertar alta prevista: Faltan campos en la cabecera');
        return;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar alta prevista');
            return;
                }
        res.status(200).send('Inserción correcta');
            return;

    })
   
}
