const mysql = require ('mysql');
require('dotenv').config();

const connection = mysql.createConnection(
    {
        host : process.env.HOST,
        user : process.env.USERDB,
        password : process.env.PASSDB,
        database : process.env.DATABASE,
        port: process.env.DBPORT,
        multipleStatements: false
    }
)
/*async function query_db(sql,params){
    connection.connect();
    let res = connection.query(sql,params,(err,res)=>{
        if(err){
            throw err;
        }
        connection.end()
    });
    return res;
}*/

module.exports=connection;