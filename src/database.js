const mysql = require('mysql');
const { promisify } = require('util'); // para uso de promesas
const { database } = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) =>{
  if(err){
    if(err.code === ('PROTOCOL_CONNECTION_LOST')){
      console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if(err.code === ('ER_CON_COUNT_ERROR')){
      console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
    if(err.code === ('ECONNRECONFUSED')){
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }
  if(connection){
    console.log('DB is connected');
    return;
  }
})
pool.query = promisify(pool.query); // es lo que se almacena cada vex que se hacen consultas

module.exports = pool;