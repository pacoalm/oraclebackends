const oracledb = require("oracledb");
oracledb.autoCommit= true;

let connection;

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


