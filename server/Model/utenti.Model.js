const sql = require('../database/db');
const md5 = require('md5');
const salt = require('../function/function');

const Utente = (utente)=>{
    this.username = utente.username;
    this.password = utente.password;
    this.role = utente.role;
    this.salt = utente.salt;
}


Utente.get_user = (user , result)=>{

    sql.query("SELECT * FROM login WHERE username = ? and role = ? " ,[user.username,user.role],(err , res)=>{
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

Utente.add_user = async(user , result)=>{
    sql.query("SELECT * FROM login WHERE username = ?" , [user.username] , (err , res)=>{
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else if(res.length>0){
            result( "Username già in uso" , null) ;
            return ;
        }
        else{
            user.salt = salt.create_salt(20) ;
            user.password =md5( user.password + user.salt );
            user.status = 1;
    
            sql.query("INSERT INTO login SET ?",user,(err , res)=>{
                if(err){
                    console.log(err);
                    result(err , null);
                    return;
                }
            console.log(res.insertId)
            result(null,{id:res.insertId});
            })
        }
    })

}


Utente.getToken = (data,result ) => {
    sql.query("SELECT * FROM token WHERE username= ?" ,[data.username],(err,res) => {
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else result(null,res);
    });
}


Utente.removeToken = (data,result) => {
    sql.query("Delete  FROM token WHERE Id= ?" ,[data.id],(err,res) => {
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else result(null,res);
    })
}


Utente.addToken = (data , result ) => {

    sql.query("SELECT * FROM token WHERE username= ?" ,[data.username],(err,res) => {
        if(err){
            console.log(err);
            result(err , null);
            return;
        }

        else if(res.length === 0){
            sql.query("INSERT INTO token(username,Id,token) VALUES(?,?,?)",[data.username,data.id,data.refresh_token],(err,res) => {
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
// (NOW() - INTERVAL 5 MINUTE)
Utente.recoverAccount=(data,result)=>{

    sql.query("SELECT * FROM login WHERE email=?",[data],(err,res)=>{
        if(err){
            console.log(err);
            result("Errore durante l'operazione", null);
            return;
        }
        else if(res.length != 0){
            const randstring=salt.create_randstring(30,"user_activation");
            const time = new Date().toISOString().slice(0, 19).replace('T', ' ');
            sql.query("INSERT INTO user_activation(email,randstring,time) VALUES(?,?,?)",[data,randstring,time],async(err,res)=>{
                if(err){
                    console.log(err);
                    result("Errore durante l'operazione" , null);
                    return;
                }
                else{
                    let obj={to :data,
                    subject:"Reset password",text:"We provide you a link to reset the password",
                    html:`<b>Recover your credentials</b>
                    <br><a href="http://localhost:3000/resetPassword/${randstring}/">Click on the link to activate the account</a><br/>`};
                        
                    let mail_result = salt.send_mail(obj);
                    if(mail_result == "OK"){
                        result(null , mail_result);
                    }
                    else{
                        result("Errore durante l'operazione" , null);
                    }
                }
                })
            }
        
        else{
            result("Email non valida" , null);
        }
    })

}

Utente.checkCode=(data,result)=>{
    sql.query("SELECT * FROM user_activation WHERE randstring=?",[data.randstring],(err,res)=>{
        if(err){
            result("Errore durante l'operazione", null);
            return;
        }
        else if(res.length==0){
            result("Errore durante l'operazione", null);
            return;
        }
        else{
            result(null,"OK")
        }
    })
}

Utente.resetPassword=(data,result)=>{
    
    sql.query("SELECT * FROM user_activation WHERE randstring=?",[data.randstring],(err,res)=>{
        if(err){
            console.log(err);
            result("Errore durante l'operazione", null);
            return;
        }
        else if(res.length==0){
            console.log(err);
            result("Errore durante l'operazione", null);
            return;
        }
        else{

            if(data.pass!=data.repass){
                result("Le due password non coincidono", null);
                return;
            }
            else{
                let email = res[0].email;
                let password =  md5( data.pass + salt.create_salt(20) );
                sql.query("UPDATE login SET password=? WHERE email=?",[password,email],(err,res)=>{
                    if(err){
                        console.log(err);
                        result("Errore durante l'operazione", null);
                        return;
                    }
                    else{
                        result(null,"OK");
                        return;
                    }
                })
            }
        }

    })
}


module.exports= Utente;