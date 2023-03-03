const Admin = (admin) => {}
const sql = require('../database/db');

const User = (utente)=>{
    this.username = utente.username;
    this.password = utente.password;
    this.salt = utente.salt;
  }

Admin.get_user = (user,result) =>{

  sql.query("SELECT * FROM admin WHERE username = ?" ,[user.username],(err , res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if( res.password === md5( user.password + res.salt )){
            result(null , res);
        }

        else{
            result("Username o password sbaglaiti" , null )
        }

    });
}

Admin.addAdmin = (user,result) =>{
   sql.query("SELECT * FROM admin WHERE username = ?" , [user.username] , (err , res)=>{
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
    sql.query("INSERT INTO admin SET ?",user,(err , res)=>{
        if(err){
            console.log(err);
            result(err , null);
            return;
        }
        
        result(null,{username:res.username,password:res.password,role:res.role});
    })

}


Admin.deleteUser_from_blockchain = ( user,result ) => {
    if( user.role==='patient' ){
        var res = JSON.parse(Buffer.from(await contract.submitTransaction("patient:deletePatient",JSON.stringify(user))).toString());
    }
    else if( user.role === 'doctor' ){
        if( user.role==='patient' ){
            var res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:deleteDoctor",JSON.stringify(user))).toString());
        }
    }
}


Admin.addUser_to_blockchain = ( user,result ) => {
    
    if( user.role==='patient' ){
        var res = JSON.parse(Buffer.from(await contract.submitTransaction("patient:addPatient",JSON.stringify(user.patient))).toString());
    }
    else if( user.role === "doctor" ){
        var res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:addDoctor",JSON.stringify(user.doctor))).toString());

    } 
    if( res.status === 'error' ){
        result( "Error",null );
        return;
    }
    else{
        result( null,res );
    }

}


Admin.listDoctor_from_blockchain = ( result ) => {
    var res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:getAll")).toString());
    if( res.status === 'error' ){
        result( "Error",null );
        return;
    }
    else{
        result( null,res );
    } 
}


Admin.listPatient_from_blockchain = ( result ) => {
    var res = JSON.parse(Buffer.from(await contract.submitTransaction("patient:getAll")).toString());
    if( res.status === 'error' ){
        result( "Error",null );
        return;
    }
    else{
        result( null,res );
    } 
}
