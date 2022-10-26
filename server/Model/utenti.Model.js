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
        if(res.length === 0){
            result("Username o password sbaglaiti" , null )
            return
        }
        if( res[0].password === md5( user.password + res[0].salt ) && res[0].role === user.role ){
            result(null , res);
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



Utente.addToken = (data , result ) => {

    sql.query("SELECT * FROM token WHERE username= ?" ,[data.username],(err,res) => {
        
        if(err){
            console.log(err);
            result(err , null);
            return;
        }

        else if(!res.length === 0){
            sql.query("INSERT INTO token(username,token) VALUES(?,?)",[data.username,data.refresh_token],(err,res) => {
                
                if(err){
                    console.log(err);
                    result(err , null);
                    return;
                }
                
                else{
                    result(null,res);
                }
            } )
        }

        else {

            sql.query("UPDATE token SET token=(?) WHERE username=(?)",[data.refresh_token,data.username],(err,res) => {
                
                if(err){
                    console.log(err);
                    result(err , null);
                    return;
                }

                else{
                    result(null,res);

                }
            })

        }
        
    })
}



module.exports= Utente;