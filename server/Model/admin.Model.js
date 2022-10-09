const Admin = (admin) => {}


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
        var res = JSON.parse(Buffer.from(await contract.submitTransaction("patient:addPatient",JSON.stringify(user))).toString());
    }
    else if( user.role === "doctor" ){
        var res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:addDoctor",JSON.stringify(user))).toString());

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