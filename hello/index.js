const oracledb = require("oracledb");
let connection;

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: "tc_aux_tenerife",
      password: "a8xt3n3r1f3",
      connectionString: "SJDPROD",
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();