const sql = require('../database/db');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const rand = require('../function/function');
const jwt = require('jsonwebtoken');

const Admin = (utente)=>{
    this.username = utente.username;
    this.password = utente.password;
    this.salt = utente.salt;
  }


// 1)########################OK#############################################################
Admin.get_user = (user,result) =>{
  sql.query("SELECT * FROM admin WHERE username = ?" ,[user.username],(err , res)=>{
        if(err){
            console.log(err);
            result("Qualcosa è andato storto",null);
            return;
        }
        if( res[0].password === md5( user.password + res[0].salt )){
            result(null , res);
            return;
        }

        else{
            result("Username o password sbaglaiti" , null );
            return;
        }

    });
}


//2)
Admin.removeUser = (user,result) =>{
    sql.query("DELETE FROM login  WHERE id= ?" , [user.id.id] , (err , res)=>{
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else{
            result( null,res) ;
            return ;
        }
    })
}


Admin.getAdminList = (result) =>{

    sql.query("SELECT username,state,email FROM admin ", (err , res)=>{
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else{
            result( null,res) ;
            return ;
        }
    })
}


Admin.removeAdmin = (user,result) =>{
    console.log(user);
    sql.query("DELETE FROM admin  WHERE username= ?" , [user.id] , (err , res)=>{
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else{
            result( null,res) ;
            return ;
        }
    })
}
//3)########################OK#############################################################
Admin.addAdmin = (user,result) =>{


    sql.query("SELECT * FROM admin WHERE username = ? or email=?" , [user.username,user.email] , (err , res)=>{
        if(err){
            console.log(err);
            result("Qualcosa è andato storto",null) ;
        }
        else if(res.length!=0){
            
            result("Username o email già in uso" ,null);
        }
        else{
            sql.query("SELECT * FROM login WHERE username = ? or email = ? " , [user.username,user.email] , (err , res)=>{
                if(err){
                    console.log(err);
                    result("Qualcosa è andato storto",null) ;
                }
                else if(res.length!=0){
                    console.log(res)
                    result("Username o email già in uso" ,null);
                }
                else{
                    user.password = md5( user.password + user.salt );
                    sql.query("INSERT INTO admin SET ?",user,(err , res)=>{
                        if(err){
                            console.log(err);
                            result("Errore durante l'operazione",null) ;
                        }
                        else{
                            const randstring=rand.create_salt(30);
                            let time = new Date()
                            time.setHours(time.getHours() + 1);
                            time=time.toISOString().slice(0, 19).replace('T', ' ');
                            sql.query("INSERT INTO admin_activation(email,randstring,time) VALUES(?,?,?)",[user.email,randstring,time],(err,_) => {
                                if(err){
                                    console.log(err);
                                    result("Errore durante l'operazione",null) ;
                                }
                                else{
                                    let obj={to :user.email,
                                            subject:"Activate Account",text:"Hi "+user.username+" we provide you a link to activate the account",
                                            html:`<b>Activate Account</b>
                                            <br><a href="http://localhost:3000/activate/${randstring}/">Click on the link to activate the account</a><br/>`};

                                    let mail_result = rand.send_mail(obj);
                                    if(mail_result == "OK"){
                                        result(null , mail_result);
                                    }
                                    else{
                                        result("Errore durante l'operazione" , null);
                                    }
                                }
                            })


                        }
                    })
                }
            })
        }
    })




}


Admin.activate_account = (rand_value,result) =>{
    sql.query("SELECT * FROM admin_activation WHERE randstring = ?",[rand_value],(err,res) =>{
        if(err){
            console.log(err);
            result("Errore durante l'operazione",null) ;
        }
        else if(res[0]!=undefined){
            sql.query("UPDATE admin SET state=1 WHERE email=?",res[0].email,(err,res)=>{
                if(err){
                    console.log(err);
                    result("Errore durante l'operazione",null) ;
                }
                else{
                    sql.query("DELETE FROM admin_activation WHERE randstring=?",[rand_value],(err,res)=>{
                        if(err){
                            console.log(err);
                            result("Errore durante l'operazione",null) ;
                        }
                        else{
                            result(null,"OK");
                        }
                    })

                }
            })
        }
    })
}



Admin.recover_account = (data,result)=>{
    sql.query("SELECT * FROM admin WHERE email=?",[data],(err,res)=>{
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
            sql.query("INSERT INTO admin_activation(email,randstring,time) VALUES(?,?,?)",[data,randstring,time],async(err,res)=>{
                if(err){
                    console.log(err);
                    result("Errore durante l'operazione" , null);
                    return;
                }
                else{
                    let obj={to :data,
                    subject:"Reset password",text:"We provide you a link to reset the password",
                    html:`<b>Recover your credentials</b>
                    <br><a href="http://localhost:3000/ad/resetPassword/${randstring}/">Click on the link to reset the password</a><br/>`};

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

Admin.send_device_code_check = (data,result) => {
    let expire = new Date()
    expire.setHours(expire.getHours() + 1);
    expire=expire.toISOString().slice(0, 19).replace('T', ' ');

    sql.query("select * from admin where username = ?",[data],(err,res) =>{
        if(err){
            result("Errore durante l'operazione", null);
            return;
        }
        else{
            //console.log(res[0].email)
            let email = res[0].email
            code = rand.create_salt(5);
            
            
            sql.query("select * from device_code_check where email = ?",[email],(err,res) =>{
                if(err){
                    console.log(err)
                    result("Errore durante l'operazione" , null);
                }
                else if(res.length !== 0 ){
                    
                    sql.query("update device_code_check set code = ?,time = ? where email = ?",[code,expire,email],(err,res) =>{
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
        
                                let mail_result = rand.send_mail(obj);
        
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
                    sql.query("INSERT INTO device_code_check(email,code,time) VALUES(?,?,?)",[email,code,expire],(err,res) =>{
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
        
                                let mail_result = rand.send_mail(obj);
        
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

Admin.check_device = (data,result) => {
    let expire = new Date()
    expire.setDate(expire.getDate() );
    expire=expire.toISOString().slice(0, 19).replace('T', ' ');
    sql.query("select * from devices where uid = ? and email = ? and time > ?",[data.uid,data.email,expire],(err,res) =>{
        console.log(res);
        if(err){
            result("Errore durante l'operazione", null);
            return;
        }
        else if(res.length === 0 ){
            sql.query("delete from devices where time < ?",[expire],(err,res) =>{
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

////////////////////////////////////////////////
Admin.verify_device_code = (data,result) => {
    
    sql.query("select * from admin where username = ? ",[data.username],(err,res) =>{
        if(err || res.length ===0 ){
            console.log(err)
            result("Errore durante l'operazione", null);
            return;
        }

        else{
            let email = res[0].email;
            sql.query("select * from device_code_check where code = ? and email = ?",[data.code,email],(err,res) => {
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
                    sql.query('delete from device_code_check where code = ?',[data.code],(err,res) => {
                        if(err){
                          console.log(err)
                          result("Errore durante l'operazione", null);
                          return;
                        }
                        else{
                            result(null,{email:email})
                        }
                    })
                }
            })
        }
    })
}

////////////////////////////////////////////////
Admin.save_device = (data,result) => {
    console.log("qui");
    let uid = rand.create_salt(60);
    
    let expire = new Date()
    expire.setDate(expire.getDate() + 30);
    expire=expire.toISOString().slice(0, 19).replace('T', ' ');
    
    sql.query('INSERT INTO devices(email,uid,time) VALUES(?,?,?)',[data.email,uid,expire],(err,res) => {
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


Admin.update_device_uid = (data,result) => {
    let uid = rand.create_salt(60);
    let expire = new Date()
    expire.setDate(expire.getDate() + 30);
    expire=expire.toISOString().slice(0, 19).replace('T', ' ');

    sql.query('UPDATE devices SET time = ?,uid = ?  where email = ? and uid = ?',[expire,uid,data.email,data.uid],(err,res) => {
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


Admin.checkCode=(data,result)=>{
    sql.query("SELECT * FROM admin_activation WHERE randstring=?",[data],(err,res)=>{
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


Admin.resetPassword=(data,result)=>{
    sql.query("SELECT * FROM admin_activation WHERE randstring=?",[data.randstring],(err,res)=>{
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
                sql.query("UPDATE admin SET password=?,salt=? WHERE email=?",[password,salt_val,email],(err,_)=>{
                    if(err){
                        console.log(err);
                        result("Errore durante l'operazione", null);
                        return;
                    }
                    else{
                        sql.query("DELETE FROM admin_activation WHERE email =?",[email],(err,_)=>{
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

Admin.add_patient_record = async( record,result ) => {

    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:addRecord",JSON.stringify(record))) ).toString());
        if( res.status === 'error' ){
            result( "Error",null );
            await gateway.disconnect();
            return;
        }
        else{
            result( null,res );
            await gateway.disconnect();
        }
    }
    catch(error){
        result("Error",null);
        res.status(500).json({message: error});
    }
    finally{
        await gateway.disconnect();
    }
}

//4)
Admin.deleteUser_from_blockchain = async( user,result ) => {
    let res = "N/A";
    try{
        if( user.role==='patient' ){
            res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:deleteRecord",user.id.id ))).toString());
        }
        else{
            res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:deleteDoctor",user.id.id))).toString());
            }
        console.log(res)
        result(null,res);
    }
    catch{
        result( "Errore qualcosa è andato storto",null);
    }
    finally{
        await gateway.disconnect();
    }

}
// ####################################################OK################################################
Admin.validateData = async( user,result ) =>{

    error = false
    if(user['role'] == "patient"){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:getAll"))).toString());

        if( res.status === 'error' ){
            console.log("errore");
            result( "Error",null );
        }
        else{

            for(var elem of res){
                if(user['cf'] == elem['personalData']['cf'] ){
                    error = "CF già in uso";
                    break;
                }
                else if( user['numero'] == elem['personalData']['number']){
                    error = "Numero già in uso";
                    break;
                }
            }
            if(error){
                result(error,null);
                return
            }
            else{
                result(null,"OK");
                return
            }
        }
    }
    else{
        result(null,"OK");
    }
}
//5) ###########################################################OK#################################################################
Admin.addUser_to_blockchain = async( user,result ) => {
    try{
        console.log(user)
        if( user.role==='patient' ){
            let data = {
                id:user.id,
                name:user.nome,
                surname:user.cognome,
                cf:user.cf,
                number:user.numero,
                weight:user.peso,
                height:user.altezza
            }
            console.log(data)
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:addRecord",JSON.stringify(data)))).toString());
        }
        else{
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:addDoctor",JSON.stringify(user)))).toString());

        }
        result(null,res);
    }
    catch{
        result( "Errore qualcosa è andato storto",null);
    }
    finally{
        await gateway.disconnect();
    }

}

//6) ########################OK#############################################################
Admin.listDoctor_from_blockchain = async( result ) => {
    try{

        var res = JSON.parse(Buffer.from(await(contract.submitTransaction("doctor:getAll"))).toString());
        result( null,res );
    }
    catch{

        result( "Errore qualcosa è andato storto",null);
    }
    finally{
        await gateway.disconnect();
    }
}

//7) ########################OK#############################################################
Admin.listPatient_from_blockchain = async( result ) => {
    try{

        var res = JSON.parse(Buffer.from(await(contract.submitTransaction("record:getAll"))).toString());

        for(index = 0; index<res.length; index ++){
            delete res[index]["personalData"]["height"];
            delete res[index]["personalData"]["weight"];
            delete res[index]["info"];
        }

        result( null,res );
    }
    catch{
        result(null,res);
    }
    finally{
        await gateway.disconnect();
    }
}


Admin.update_doctor = async( record,result ) => {
    try{
        var res = JSON.parse(Buffer.from(await(contract.submitTransaction("doctor:updateDoctor",JSON.stringify(record)))).toString());
        if( res.status==="error" ){
            result( "Errore",null );
            await gateway.disconnect();
            return;
        }
        else{
            result( null,res );
            await gateway.disconnect();
        }
    }
    catch{
        result(null,res);
    }
    finally{
        await gateway.disconnect();
    }
}

Admin.update_patient = async( record,result ) => {
    try{
        var res = JSON.parse(Buffer.from(await(contract.submitTransaction("record:updateRecordPersonalData",JSON.stringify(record)))).toString());
        if( res.status==="error" ){
            result( "Errore",null );
            await gateway.disconnect();
            return;
        }
        else{
            result( null,res );
            await gateway.disconnect();
        }
    }
    catch{
        result(null,res);
    }
    finally{
        await gateway.disconnect();
    }
}



Admin.getToken = (data,result ) => {
    sql.query("SELECT * FROM admin_token WHERE username= ?" ,[data.username],(err,res) => {
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        else result(null,res);
    });
}


Admin.addToken = (data,result ) => {
    sql.query("SELECT * FROM admin_token WHERE username= ?" ,[data.username],(err,res) => {
        if(err){
            console.log(err);
            result("Qualcosa è andato storto" , null);
            return;
        }
        else if(res.length === 0){
            sql.query("INSERT INTO admin_token(username,token) VALUES(?,?)",[data.username,data.refresh_token],(err,res) => {
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

            sql.query("UPDATE admin_token SET token=(?) WHERE username=(?)",[data.refresh_token,data.username],(err,res) => {

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



Admin.removeToken = (data,result) => {
    console.log(data)
    sql.query("select *  FROM admin WHERE username= ?" ,[data.id],(err,res) => {
        if(err){
            console.log(err);
            result("Qualcosa è andato storto" , null);
            return;
        }

        else{
            console.log(res)
            let email = res[0].email;
            sql.query("Delete  FROM admin_activation WHERE email= ?" ,[email],(err,res) => {
                if(err){
                    console.log(err);
                    result("Qualcosa è andato storto" , null);
                    return;
                }
                else{
                    sql.query("Delete  FROM admin_token WHERE username= ?" ,[data.username],(err,res) => {
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
    })

}

Admin.send_token = (data,result) => {
    sql.query("select * from  admin where email = ?",[data],(err,res) => {
      if(err || res.length === 0){
        console.log(res);
        result("Qualcosa è andato storto" , null);
        return ;
      }
      else{
        const accessToken = jwt.sign(
  
          {
          "username":res[0].username,
          "role":"admin"
          },
      process.env.ACCESS_TOKEN,
      {expiresIn:"1200s"}
        );
  
      const refresh_token = jwt.sign(
          {
          "username":res[0].username,
          "role":"admin"
          },
          process.env.REFRESH_TOKEN,
          { expiresIn:"1d" }
      );
      result(null,{refresh_token:refresh_token,accessToken:accessToken,username:res[0].username});
      return;
  
      }
    })
  }



module.exports = Admin;
