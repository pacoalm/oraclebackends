const oracledb = require("oracledb");
oracledb.autoCommit= true;

let connection;

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionString: process.env.DB_TNS,
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

export async function getConnection() {
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionString: process.env.DB_TNS,
    });
    return connection;
  } catch (err) {
    console.error(err.message);
  } 
}


