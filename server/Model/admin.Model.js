const sql = require('../database/db');
const md5 = require('md5');

const Admin = (utente)=>{
    this.username = utente.username;
    this.password = utente.password;
    this.salt = utente.salt;
  }
// ########################OK#############################################################
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

Admin.removeUser = (user,result) =>{
    sql.query("UPDATE login SET status = ? WHERE username = ?" , [0,user.username] , (err , res)=>{
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
}
// ########################OK#############################################################
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
                result(null,{username:user.username});
            }
        })
    }
    else{
        result(message,null);
    }

}

Admin.deleteUser_from_blockchain = ( user,result ) => {
    if( user.role==='patient' ){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("patient:deletePatient",JSON.stringify(user) ))).toString());
    }
    else{
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:deleteDoctor",JSON.stringify(user)))).toString());
        }
    
}


Admin.addUser_to_blockchain = ( user,result ) => {
    
    if( user.role==='patient' ){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("patient:addPatient",JSON.stringify(user.patient)))).toString());
    }
    else if( user.role === "doctor" ){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:addDoctor",JSON.stringify(user.doctor)))).toString());

    } 
    if( res.status === 'error' ){
        result( "Error",null );
        return;
    }
    else{
        result( null,res );
    }

}

// ########################OK#############################################################
Admin.listDoctor_from_blockchain = async( result ) => {
    var res = JSON.parse(Buffer.from(await(contract.submitTransaction("doctor:getAll"))).toString());
    if( res.status === 'error' ){
        result( "Error",null );
        return;
    }
    else{
        result( null,res );
    } 
}

// ########################OK#############################################################
Admin.listPatient_from_blockchain = async( result ) => {
    var res = JSON.parse(Buffer.from(await(contract.submitTransaction("record:getAll"))).toString());
    if( res.status === 'error' ){
        result( "Error",null );
        return;
    }
    else{
        result( null,res );
    } 
}

module.exports = Admin;