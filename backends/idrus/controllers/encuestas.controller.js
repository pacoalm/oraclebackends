import oracledb from 'oracledb';


var oracle =  require('../database/connection.js')


export const getEncuestasHosp = async(req, res, next) =>{
   
    
        const pool = await oracle.getConnection();
        pool.execute("SELECT * FROM V07_Idrus_Encuestas_Hosp",[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
        if (err) {
            console.log ('Error el ejecutar la query:' + err.message)
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status:500,
                message:"Error al recuperar muestra.",
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

