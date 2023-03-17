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
    
    message = ''

    sql.query("SELECT * FROM admin WHERE username = ?" , [user.username] , (err , res)=>{
        if(err){
            console.log(err);
            message=err ;
        }
        else if(res){
            message="Username già in uso" ;
        }
    })

    sql.query("SELECT * FROM login WHERE username = ?" , [user.username] , (err , res)=>{
        if(err){
            console.log(err);
            message=err ;
        }
        else if(res){
            console.log(res)
            message="Username già in uso" ;
        }
    })
    if(message.length == 0){
        user.password = md5( user.password + user.salt );
        sql.query("INSERT INTO admin SET ?",user,(err , res)=>{
            if(err){
                console.log(err);
                result("Errore durante l'operazione",null) ;
            }
            else{

                let activation_data={username:user.username,randstring:rand.create_salt(30)};
                
                sql.query("INSERT INTO activation SET ?",activation_data,(err,res) => {
                    if(err){
                        console.log(err);
                        result("Errore durante l'operazione",null) ;
                    }
                    else{
                        const transporter = nodemailer.createTransport({
                            port: 465,               // true for 465, false for other ports
                            host: "smtp.gmail.com",
                               auth: {
                                    user: 'youremail@gmail.com',
                                    pass: 'password',
                                 },
                            secure: true,
                            });
        
                        const mailData = {from: 'youremail@gmail.com',  // sender address
                            to: 'myfriend@gmail.com',   // list of receivers
                            subject: 'Sending Email using Node.js',
                            text: 'That was easy!',
                            html: `<b>Hey ${user.username} </b>
                                   <br><a href="http://localhost:3000/activate/${activation_data.randstring}/">Click on the link to activate the account</a><br/>`,
                          };
                        transporter.sendMail(mailData, function (err, info) {
                            if(err){
                              console.log(err);
                              result("Errore durante l'operazione",null) ;
                            }
                            else result(null,{username:user.username});
                         });
                    }
                })


            }
        })
    }
    else{
        result(message,null);
    }

}


Admin.activate_account = (rand_value) =>{
    sql.query("SELECT * FROM activation WHERE randstring = ?",[rand_value],(err,res) =>{
        if(err){
            console.log(err);
            result("Errore durante l'operazione",null) ;
        }
        else if(res[0]!=undefined){
            sql.query("UPDATE admin SET state=1 WHERE username=?",res[0].username,(err,res)=>{
                if(err){
                    console.log(err);
                    result("Errore durante l'operazione",null) ;
                }
                else{
                    result(null,{username:res[0].username});
                }
            })
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

module.exports = Admin;