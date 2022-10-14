const mysql = require ('mysql');
require('dotenv').config();

const connection = mysql.createPool(
    {
        host : process.env.DBPORT,
        user : process.env.USERDB,
        password : process.env.PASSDB,
        database : process.env.DATABASE,
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