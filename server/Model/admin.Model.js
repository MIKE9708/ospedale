const Admin = (admin) => {}


Admin.deleteUser_from_blockchain = async( user,result,contract ) => {
       
    try{
        if( user.role==='patient' ){
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("patient:deleteRecord",JSON.stringify(user.id)))).toString());
        }
        else if( user.role === 'doctor' ){
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:deleteDoctor",JSON.stringify(user.id)))).toString());
            
        }
        if( res.status === 'error' ){
            result( "Error",null );
            return;
        }
        else{
            result( null,res );
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


Admin.addUser_to_blockchain = async( user,result,contract ) => {
    
    try{
        if( user.role==='patient' ){
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:addRecord",JSON.stringify(user)))).toString());
        }
        else if( user.role === "doctor" ){
            var res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:addDoctor",JSON.stringify(user)))).toString());

        } 
        if( res.status === 'error' ){
            result( "Error",null );
            return;
        }
        else{
            result( null,res );
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


Admin.listDoctor_from_blockchain =async ( result,contract ) => {
    
    try{
        var res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:getAll")).toString());
        if( res.status === 'error' ){
            result( "Error",null );
            return;
        }
        else{
            result( null,res );
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


Admin.listPatient_from_blockchain = async ( result,contract ) => {
    try{
        var res = JSON.parse(Buffer.from(await contract.submitTransaction("record:getAll")).toString());
        if( res.status === 'error' ){
            result( "Error",null );
            return;
        }
        else{
            result( null,res );
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

module.exports = Admin