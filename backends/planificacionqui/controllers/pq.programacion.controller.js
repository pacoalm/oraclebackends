import { getConnection } from '../database/connection';
import dayjs from 'dayjs';
import 'dayjs/locale/es'

var oracledb = require("oracledb");

export const getExisteProgramacion = async (req, res) => {

    

    if (!req.query.facility || ! req.query.fechaInicio || !req.query.fechaFin ) {
        res.status(500).send('Error. Faltan campos en el cuerpo del mensaje');
        return;
    }

    const pool = await getConnection();
    var sql="";
    
    sql= "SELECT count(*) as total FROM  V07_PQ_programacion where facility =" + req.query.facility +
         " AND Fecha >= to_date('" + req.query.fechaInicio + "','dd/mm/yyyy') " +
         " AND Fecha <= to_date('" + req.query.fechaFin + "','dd/mm/yyyy')"
    console.log(sql);

    pool
        .execute(sql,[], {outFormat: oracledb.OBJECT}, 
        function(err,result) {
            if (err) {
                console.log ('Error el ejecutar la query:' + err.message)
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status:500,
                    message:"Error verificando programación",
                    detailed_message: err.message
                }));
            }
            else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                var total = result.rows;
                console.log(total[0].TOTAL);
                if (total[0].TOTAL> 0) res.end(JSON.stringify({valor: true}))
                else res.end(JSON.stringify({valor:false}));
            }
        }
        )
}


export const deleteProgramacion = async (req, res) => {
    var body = req.body;

    if (body.facility && body.fechaInicio && body.fechaFin ) {
        var sql = "DELETE FROM pq_programacion WHERE facility =" +  body.facility +
                  " AND Fecha >= to_date('" + body.fechaInicio + "','dd/mm/yyyy') AND Fecha <= to_date('" + body.fechaFin + "','dd/mm/yyyy')"
    }
    else {
        res.status(500).send('Error al borrar programación. Faltan campos en el cuerpo del mensaje');
        return;
    }



    
    const pool = await getConnection();
    console.log(sql);
    pool.execute (sql, [],
    function (err, result) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al borrar la programación:' + err.message);
            return
            }
        res.status(200).send('Borrado correcto');
        return;
        }
    )
}

export const putProgramacion = async (req, res) => {

    var plantilla = [];
    var detallesPlantilla = [];
    var semanas;
    var facility;


    'Comprobar si todos los datos estan ok'
    var body = req.body;
    console.log(body);
    
    if (!body.UUIDPlantilla ||  !body.fechaInicio ||  !body.fechaFin) {
        res.status(500).send('Error al crear programación. Faltan campos en el cuerpo del mensaje');
        return;
    }

    async function crearProgramacion () {
        dayjs.locale('es')
        
        let d1= dayjs(body.fechaInicio.substring(6,10) + "-" + body.fechaInicio.substring(3,5) + "-" + body.fechaInicio.substring(0,2)) 
        let d2= dayjs(body.fechaFin.substring(6,10) + "-" + body.fechaFin.substring(3,5) + "-" + body.fechaFin.substring(0,2)) 
       
        let semanaActual = 1
        
        while(d1 <= d2) {

            //Extraer día de la semana'
            //0 Domingo , 1 Lunes, ... 6 Sabado

         
             //Buscar en los detalles de la plantilla si hay planficacion

             let registros = detallesPlantilla.filter ((r) => r.DIA == d1.day() && r.SEMANA == semanaActual)    
             const pool = await getConnection();
            registros.map ((r) => {
                let SQL = "INSERT INTO PQ_Programacion (Sid, Facility,Fecha, Alias_Ubicacion,Turno, Servicio, Alias_Recurso) VALUES ("
                SQL = SQL + "seq_pq_programacion.NEXTVAL," + facility + ",TO_DATE('" + d1.format('DD/MM/YYYY') + "','DD/MM/YYYY'),'" + r.UBICACION + "',"
                SQL = SQL + "'" + r.TURNO + "'," 
                if (r.SERVICIO != null) 
                    {SQL = SQL + "'" + r.SERVICIO + "',null)" }
                else 
                    {SQL = SQL + "null,'" + r.ALIASR + "')"}
                
                console.log(SQL);
                pool.execute (SQL, [],
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        res.status(500).send('Error al generar la programación:' + err.message);
                        return;
                            }
                       
                        }
                    )

                console.log (SQL)
                console.log('-----------------------')
            })

            d1 = d1.add(1,'day')

            //El lunes compruebo si he de aumentar la semana
            if (d1.day() == 1 && semanas > 1) {
                if (semanaActual < semanas) semanaActual=semanaActual + 1        
                else semanaActual = 1;
            }

        }


        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            status:200,
            message:"Programación creada correctamente.",
            detailed_message: "Todo Ok"
        }))

    }



    async function cargaDetallesPlantilla() {

        const pool = await getConnection();
        var sql= "SELECT * FROM  V07_PQ_detalle_plantilla where sid_plantilla = '" + body.UUIDPlantilla + "'";

        await pool
            .execute(sql,[], {outFormat: oracledb.OBJECT}, 
            function(err,result) {
                if (err) {
                    
                    console.log ('Error el ejecutar la query:' + err.message)
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        status:500,
                        message:"Error recuperando detalles de plantilla",
                        detailed_message: err.message
                    }))}
                else {
                
                    detallesPlantilla = result.rows;
                    
                    console.log ("Detalles Plantilla:" + detallesPlantilla.length)
                    
                    crearProgramacion();

                }
            }
            )
    }


    
    async function LeerPlantilla ()  {  

        'Leer datos de la plantilla'
        const pool = await getConnection();
        var sql= "SELECT * FROM PQ_PLANTILLAS where uuid ='" + body.UUIDPlantilla + "'";

        await pool
            .execute(sql,[], {outFormat: oracledb.OBJECT}, 
            function(err,result) {
                if (err) {
                    console.log ('Error el ejecutar la query:' + err.message)
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        status:500,
                        message:"Error recuperando plantilla",
                        detailed_message: err.message
                    }));
                }
                else {
                
                    plantilla = result.rows;
                    semanas = plantilla[0].SEMANAS;
                    facility = plantilla[0].FACILITY;
                    console.log (plantilla[0].DESCRIPCION);
                    var res = cargaDetallesPlantilla()
                    console.log("ASYNC?")    
                        

                }
            }
            )
    }    








    LeerPlantilla()
    
        

}


