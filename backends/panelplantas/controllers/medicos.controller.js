
import { getConnection } from '../database/connection';
var oracledb = require("oracledb");

export const getMedico = async (req, res) => {

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

export const getMedicos = async (req, res) => {

    const pool = await getConnection();
    var sql="";

    
    sql= "SELECT * FROM V07_PNL_MEDICOS"
    
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando lista de médicos",
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

export const updateColorMedico = async (req, res) =>{

    console.log('Update Color Medico ' + req.params.sid);
    console.log(req.body);

    const pool = await getConnection();
   
    var body = req.body;

    if (body.color_fondo) {
        var sql = "UPDATE PNL_Med_Colores SET COLOR_FONDO='" + body.color_fondo + "' WHERE Sid_Medico=" + req.params.sid;
    }
    else {
        var sql = "UPDATE PNL_Med_Colores SET COLOR_TEXTO='" + body.color_texto + "' WHERE Sid_Medico=" + req.params.sid;
    }
        
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error actualizando color de fondo');
            return;
                }
        res.status(200).send('Actualización correcta');
            return;

    })
   
}


export const getAllMedicos = async (req, res) => {

    const pool = await getConnection();
    var sql="";

    
    sql= "SELECT * FROM V07_PNL_ALL_MEDICOS"
    
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error recuperando lista de médicos",
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