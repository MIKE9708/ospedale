const sql = require('../database/db');
const md5 = require('md5');

const Utente = (utente)=>{
    this.username = utente.username;
    this.password = utente.password;
    this.role = utente.role;
    this.salt = utente.salt;
}


Utente.get_user = (user , result)=>{
    sql.query("SELECT * FROM login WHERE username = ?" ,[user.username],(err , res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if( res.password === md5( user.password + res.salt ) ){
            result(null , res);
        }

        else{
            result("Username o password sbaglaiti" , null )
        }

    });

}

Utente.add_user = (user , result)=>{
    sql.query("SELECT * FROM login WHERE username = ?" , [user.username] , (err , res)=>{
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else if(res){
            result( "Username già in uso" , null) ;
            return ;
        }
    })
    user.password = md5( user.password + user.salt );
    sql.query("INSERT INTO login SET ?",user,(err , res)=>{
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        result(null,{username:res.username,password:res.password,role:res.role});
    })
}





module.exports= Utente;