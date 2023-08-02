const sql = require('../database/db');
const md5 = require('md5');
const salt = require('../function/function');
const jwt = require('jsonwebtoken');

const Utente = (utente)=>{
    this.username = utente.username;
    this.password = utente.password;
    this.role = utente.role;
    this.salt = utente.salt;
}


Utente.get_user = (user , result)=>{
    sql.query("SELECT * FROM login WHERE username = ? and role = ? " ,[user.username,user.role],(err , res)=>{
        // console.log(res[0].password ,md5( user.password + res[0].salt ))

        if(err){
            console.log(err);
            result("Qualcosa è andato storto",null);
            return;
        }
        if(res.length === 0){
            result("Username o password sbaglaiti" , null )
            return
        }
        if( res[0].password === md5( user.password + res[0].salt ) && res[0].role === user.role ){
            result(null , res);

        }
        else{
            result("Username o password sbaglaiti" , null )
            return
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
        else if ( user.password !== user.repassword) {
            result( "Le password non coincidono" , null) ;
        }
        else{
            user.salt = salt.create_salt(20) ;
            password = salt.create_salt(30);
            user.password =md5( password + user.salt );
            user.status = 1;
            delete user.repassword;
            sql.query("INSERT INTO login SET ?",user,(err , res)=>{
                if(err){
                    console.log(err);
                    result(err , null);
                    return;
                }
            //console.log(res.insertId)
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
    console.log(data);
    sql.query("Delete  FROM token WHERE username= ?" ,[data.username],(err,res) => {
        if(err){
            console.log(err);
            result("Qualcosa è andato storto" , null);
            return;
        }
        else result(null,res);
    })
}

////////////////////////////////////////////////////////////////////////////
Utente.send_token = (data,result) => {
    sql.query("select * from  login where email = ?",[data],(err,res) => {
      if(err || res.length === 0){
        console.log(res);
        result("Qualcosa è andato storto" , null);
        return ;
      }
      else{
        const accessToken = jwt.sign(
  
          {
          "username":res[0].username,
          "role":res[0].role,
          "id":res[0].Id
          },
      process.env.ACCESS_TOKEN,
      {expiresIn:"1200s"}
        );
  
      const refresh_token = jwt.sign(
          {
          "username":res[0].username,
          "role":res[0].role,
          "id":res[0].Id
          },
          process.env.REFRESH_TOKEN,
          { expiresIn:"1d" }
      );
      result(null,{refresh_token:refresh_token,accessToken:accessToken,username:res[0].username,role:res[0].role,id:res[0].Id});
      return;
  
      }
    })
  }

////////////////////////////////////////////////////////////////////////////
Utente.addToken = (data , result ) => {
    console.log(data)
    sql.query("SELECT * FROM token WHERE username= ?" ,[data.username],(err,res) => {
        if(err){
            console.log(err);
            result("Qualcosa è andato storto" , null);
            return;
        }

        else if(res.length === 0){
            sql.query("INSERT INTO token(username,Id,token) VALUES(?,?,?)",[data.username,data.id,data.refresh_token],(err,res) => {
                if(err){
                    console.log(err);
                    result("Qualcosa è andato storto" , null);
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
                    result("Qualcosa è andato storto" , null);
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

    sql.query("SELECT * FROM login WHERE email=?",[data.email],(err,res)=>{
        if(err){
            console.log(err);
            result("Errore durante l'operazione", null);
            return;
        }
        else if(res.length != 0){
            const randstring=salt.create_salt(30);
            let time = new Date()
            time.setHours(time.getHours() + 1);
            time=time.toISOString().slice(0, 19).replace('T', ' ');
            sql.query("INSERT INTO user_activation(email,randstring,time) VALUES(?,?,?)",[data.email,randstring,time],async(err,res)=>{
                if(err){
                    console.log(err);
                    result("Errore durante l'operazione" , null);
                    return;
                }
                else{
                    let obj={to :data.email,
                    subject:"Reset password",text:"Hi "+ data.username + " we provide you a link to reset the password",
                    html:`<b>Reset your credentials</b>
                    <br><a href="http://localhost:3000/resetPassword/${randstring}/">Click on the link to reset the password</a><br/>`};
                        
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
    
        sql.query("SELECT * FROM user_activation WHERE randstring=?",[data.code],(err,res)=>{
            if(err){
                console.log(err)
                
                result("Errore durante l'operazione", null);
                return;
            }
            
            else if(res.length==0){
                
                result("Errore durante l'operazione", null);
                return;
            }
            else{
                result(null,"OK");
                return;
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
                let salt_val = salt.create_salt(20)
                let password =  md5( data.pass + salt_val );
                sql.query("UPDATE login SET password=?,salt=? WHERE email=?",[password,salt_val,email],(err,_)=>{
                    if(err){
                        console.log(err);
                        result("Errore durante l'operazione", null);
                        return;
                    }
                    else{
                        sql.query("DELETE FROM user_activation WHERE email =?",[email],(err,_)=>{
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
                })
            }
        }

    })
}

Utente.check_device = (data,result) => {
    let expire = new Date()
    expire.setDate(expire.getDate() );
    expire=expire.toISOString().slice(0, 19).replace('T', ' ');
    sql.query("select * from user_devices where uid = ? and email = ? and time >  ?",[data.uid,data.email,expire],(err,res) =>{
        if(err){
            result("Errore durante l'operazione", null);
            return;
        }
        else if(res.length === 0 ){
            sql.query("delete from user_devices where time < ?",[expire],(err,res) =>{
                if(err){
                    console.log(err)
                    result("Errore durante l'operazione", null);
                    return;
                }
                else{
                    result(null,{check_device:false});
                    return;
                }
            })
        }
        else{
            result(null,{check_device:true,email:res[0].email});
            return;
        }
    })
}

Utente.verify_device_code = (data,result) => {

    sql.query("select * from login where username = ? ",[data.username],(err,res) =>{
        if(err || res.length ===0 ){
            console.log(err)
            result("Errore durante l'operazione", null);
            return;
        }

        else{
            let user_data = {role : res[0].role,email : res[0].email,id:res[0].id};
            sql.query("select * from user_device_code_check where code = ? and email = ?",[data.code,user_data.email],(err,res) => {
                if(err){
                console.log(err)
                result("Errore durante l'operazione", null);
                return;
                }
                else if(res.length === 0 ){
                console.log(err)
                result("Codice Errato", null);
                return;
                }
                else{
                    sql.query('delete from user_device_code_check where code = ?',[data.code],(err,res) => {
                        if(err){
                          console.log(err)
                          result("Errore durante l'operazione", null);
                          return;
                        }
                        else{
                            result(null,user_data)
                        }
                    })
                }
            })
        }
    })
}

Utente.update_device_uid = (data,result) => {
    let uid = salt.create_salt(60);
    let expire = new Date()
    expire.setDate(expire.getDate() + 30);
    expire=expire.toISOString().slice(0, 19).replace('T', ' ');

    sql.query('UPDATE user_devices SET uid = ?,time = ?  where email = ? and uid = ?',[uid,expire,data.email,data.uid],(err,res) => {
        if(err){
          console.log(err)
          result("Errore durante l'operazione", null);
          return;
        }
        else{
            result(null,{email:data.email,uid:uid});
        }
    })
}


Utente.save_device = (data,result) => {
    let uid = salt.create_salt(60);
    let expire = new Date()
    expire.setDate(expire.getDate() + 30);

    expire=expire.toISOString().slice(0, 19).replace('T', ' ');
    sql.query('INSERT INTO user_devices(email,uid,time) VALUES(?,?,?)',[data.email,uid,expire],(err,res) => {
        if(err){
          console.log(err)
          result("Errore durante l'operazione", null);
          return;
        }
        else{
            result(null,{email:data.email,uid:uid});
        }
    })
}


Utente.send_device_code_check = (data,result) => {
    let expire = new Date()
    expire.setHours(expire.getHours() + 1);
    expire=expire.toISOString().slice(0, 19).replace('T', ' ');

    sql.query("select * from login where username = ?",[data],(err,res) =>{
        if(err){
            result("Errore durante l'operazione", null);
            return;
        }
        else{
            //console.log(res[0].email)
            let email = res[0].email
            code = salt.create_salt(5);
            
            
            sql.query("select * from user_device_code_check where email = ?",[email],(err,res) =>{
                if(err){
                    console.log(err)
                    result("Errore durante l'operazione" , null);
                }
                else if(res.length !== 0 ){
                    
                    sql.query("update user_device_code_check set code = ?,time = ? where email = ?",[code,expire,email],(err,res) =>{
                        if(err){
                            console.log(err)
                            result("Errore durante l'operazione" , null);
                        }
                        else{
                            let obj={to :email,
                                subject:"Device check",text:"",
                                html:`<b>Register the device </b>
                                <br><p> Here the code for verify the device <h1>${code}</h1> </p><br/>`
                                };
        
                                let mail_result = salt.send_mail(obj);
        
                                if(mail_result == "OK"){
                                    result(null , {email:email});
                                }
                                else{
                                    result("Errore durante l'operazione" , null);
                                }
                        }
                    })

                }

                else{
                    sql.query("INSERT INTO user_device_code_check(email,code,time) VALUES(?,?,?)",[email,code,expire],(err,res) =>{
                        if(err){
                            console.log(err)
                            result("Errore durante l'operazione" , null);
                        }
                        else{
                            let obj={to :email,
                                subject:"Device check",text:"",
                                html:`<b>Register the device </b>
                                <br><p> Here the code for verify the device <h1>${code}</h1> </p><br/>`
                                };
        
                                let mail_result = salt.send_mail(obj);
        
                                if(mail_result == "OK"){
                                    result(null , {email:email});
                                }
                                else{
                                    result("Errore durante l'operazione" , null);
                                }
                        }
                    
                    })
                }
            } )

        }
    })
}



module.exports= Utente;