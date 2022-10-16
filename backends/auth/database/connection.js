
var oracledb = require('oracledb');

config = require ('../config.js')

async function getConnection() {
    try {
      connection = await oracledb.getConnection(config.database
        );
      return connection;
    } catch (err) {
      console.error(err.message);
    } 
  }
  
  module.exports.getConnection= getConnection