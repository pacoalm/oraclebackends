import oracledb from 'oracledb';
import moment from 'moment'

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
    console.log(date);
    if (date.isValid()) return true;

    return false;

}

export const getCitas = async(req, res, next) =>{
   
    //Validar fecha 
 
    var fecha = req.query.fecha;
    console.log(fecha)

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
        const fechacita = '18/10/2022'
        const fechacitamasuno = '19/10/2022'

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
