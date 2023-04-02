const sql = require('../database/db');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const rand = require('../function/function');

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
            result(err,null);
            return;
        }
        if( res[0].password === md5( user.password + res[0].salt )){
            result(null , res);
        }

        else{
            result("Username o password sbaglaiti" , null )
        }

    });
}


//2)
Admin.removeUser = (user,result) =>{
    sql.query("UPDATE login SET status = ? WHERE id= ?" , [0,user.id] , (err , res)=>{
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
        else if(res[0]!=undefined){
            result("Username o email già in uso" ,null);
        }
        else{
            sql.query("SELECT * FROM login WHERE username = ? or email = ? " , [user.username,user.email] , (err , res)=>{
                if(err){
                    console.log(err);
                    result("Qualcosa è andato storto",null) ;
                }
                else if(res[0]!=undefined){
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



//4)
Admin.deleteUser_from_blockchain = async( user,result ) => {
    try{
        if( user.role==='patient' ){
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("patient:deletePatient",JSON.stringify(user.id) ))).toString());
        }
        else{
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:deleteDoctor",JSON.stringify(user.id)))).toString());
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
                if(user['personalData']['cf'] == elem['personalData']['cf'] ){
                    error = "CF già in uso";
                    break;
                }
                else if( user['personalData']['number'] == elem['personalData']['number']){
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
        if( user.role==='patient' ){
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:addRecord",JSON.stringify(user)))).toString());
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
        result( null,res );
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


Admin.removeToken = (data,result) => {
    sql.query("Delete  FROM admin_token WHERE username= ?" ,[data.username],(err,res) => {
        if(err){
            console.log(err);
            result("Qualcosa è andato storto" , null);
            return;
        }
        else result(null,res);
    })
}





module.exports = Admin;