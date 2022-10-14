const Admin = (admin) => {}


Admin.deleteUser_from_blockchain = async( user,result ) => {
    if( user.role==='patient' ){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("patient:deleteRecord",JSON.stringify(user.id)))).toString());
    }
    else if( user.role === 'doctor' ){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:deleteDoctor",JSON.stringify(user.id)))).toString());
        
    }
    if( res.status === 'error' ){
        result( "Error",null );
        await gateway.disconect();
        return;
    }
    else{
        result( null,res );
        await gateway.disconect();
    }
}


Admin.addUser_to_blockchain = async( user,result ) => {
    
    if( user.role==='patient' ){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:addRecord",JSON.stringify(user)))).toString());
    }
    else if( user.role === "doctor" ){
        var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:addDoctor",JSON.stringify(user)))).toString());

    } 
    if( res.status === 'error' ){
        result( "Error",null );
        await gateway.disconect();
        return;
    }
    else{
        result( null,res );
        await gateway.disconect();
    }

}


Admin.listDoctor_from_blockchain =async ( result ) => {
    var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:getAll"))).toString());
    if( res.status === 'error' ){
        result( "Error",null );
        await gateway.disconect();
        return;
    }
    else{
        result( null,res );
        await gateway.disconect();
    } 
}


Admin.listPatient_from_blockchain = async ( result ) => {
    var res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:getAll"))).toString());
    if( res.status === 'error' ){
        result( "Error",null );
        await gateway.disconect();
        return;
    }
    else{
        result( null,res );
        await gateway.disconect();
    } 
}