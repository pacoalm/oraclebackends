import oracledb from 'oracledb';
import moment from 'moment';

var oracle =  require('../database/connection.js')

function fechaValida(fecha) {

    if(fecha.length !== 8) {
        return false
    }
    const eje = fecha.substr(0,4);
    const mes = fecha.substr(4,2);
    const dia = fecha.substr(6,2);

    console.log(dia + '/' + mes + '/' + eje)

    var date = moment(fecha,'YYYYMMDD');
    
    if (date.isValid()) return true;

    return false;

}

export const getCitasCEX = async(req, res, next) =>{
   
    //Validar fecha 
 
    var fecha = req.query.fecha;
  

    if (fecha ===undefined || !fechaValida(fecha)) {
        res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Fecha Erronea",
                detailed_message: "Introduzca una fecha válida (YYYYMMDD)"
            }));
        
    } else {
        
        const eje = fecha.substr(0,4);
        const mes = fecha.substr(4,2);
        const dia = fecha.substr(6,2);
        
        const fechacita = dia + '/' + mes + '/' + eje;
        var fechacitamasuno;

    
        var d = new Date(eje + '-' + mes + '-' + dia)
        d.setDate(d.getDate() + 1)
        fechacitamasuno = ('0' + d.getDate()).slice(-2) + '/' +  ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
        

        const pool = await oracle.getConnection();
        pool.execute("SELECT * FROM V07_Idrus_cex_dias WHERE fecha_cita > to_date(:fechacita,'DD/MM/YYYY') AND fecha_cita < to_date(:fechacitamasuno,'DD/MM/YYYY')" ,[fechacita, fechacitamasuno], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
        if (err) {
            console.log ('Error el ejecutar la query:' + err.message)
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Error private things",
                detailed_message: err.message
            }));
        }
        else {
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result.rows));
        }
    }
    );
} 
}


export const getCitasPr = async(req, res, next) =>{
   
    //Validar fecha 
 
    var fecha = req.query.fecha;
  

    if (fecha ===undefined || !fechaValida(fecha)) {
        res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Fecha Erronea",
                detailed_message: "Introduzca una fecha válida (YYYYMMDD)"
            }));
        
    } else {
        
        const eje = fecha.substr(0,4);
        const mes = fecha.substr(4,2);
        const dia = fecha.substr(6,2);
        
        const fechacita = dia + '/' + mes + '/' + eje;
        var fechacitamasuno;

    
        var d = new Date(eje + '-' + mes + '-' + dia)
        d.setDate(d.getDate() + 1)
        fechacitamasuno = ('0' + d.getDate()).slice(-2) + '/' +  ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
        

        const pool = await oracle.getConnection();
        pool.execute("SELECT * FROM V07_Idrus_Pr_dias WHERE fecha_cita > to_date(:fechacita,'DD/MM/YYYY') AND fecha_cita < to_date(:fechacitamasuno,'DD/MM/YYYY')" ,[fechacita, fechacitamasuno], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
        if (err) {
            console.log ('Error el ejecutar la query:' + err.message)
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Error private things",
                detailed_message: err.message
            }));
        }
        else {
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result.rows));
        }
    }
    );
} 
}


export const getEstadoCita = async(req, res, next) =>{
   
    var sidCita = req.query.sid


    if (!sidCita) {
        res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Cita erronea",
                detailed_message: "Introduzca Sid de la cita"
            }));
        
    } else {
        
        const pool = await oracle.getConnection();
        pool.execute("SELECT nvl(subenc_canc_reason, 0)  as Estado FROM com_subencounters WHERE sid=" + sidCita,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
        if (err) {
            console.log ('Error el ejecutar la query:' + err.message)
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Error private things",
                detailed_message: err.message
            }));
        }
        else {
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result.rows));
        }
        }
        );
    } 
}


export const getEstadoPrueba = async(req, res, next) =>{
   
    var sidCita = req.query.sid


    if (!sidCita) {
        res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Cita erronea",
                detailed_message: "Introduzca Sid de la cita"
            }));
        
    } else {
        
        const pool = await oracle.getConnection();
        pool.execute("SELECT nvl(activ_canc_reason,0) as Estado FROM com_activities WHERE sid=" + sidCita,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
        if (err) {
            console.log ('Error el ejecutar la query:' + err.message)
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Error private things",
                detailed_message: err.message
            }));
        }
        else {
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result.rows));
        }
        }
        );
    } 
}
