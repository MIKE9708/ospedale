const Dottore = () => {

}

Dottore.get_info = async(id , result) => {
    
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:get",id) ).toString()))
        if( res.status === "error" ){
            result( "Errore" , null );
            await gateway.disconnect();
            return;
        }
        else {
            result( null , res );
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

Dottore.get_patient_record = async( id,result ) => {

    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:getMyPatientsRecord",id)) ).toString());
        if( res.status === "error" ){

            result( "Error",null );
            return ;
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



Dottore.update_patient_record = async( record,result ) => {
    
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:updateRecord",JSON.stringify(record))) ).toString());
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
    catch(error){
        result("Error",null);
        res.status(500).json({message: error});
    }
    finally{
        await gateway.disconnect();
    } 

}


Dottore.getFreePatients = async( result ) => {
    
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:getFreePatient")) ).toString());
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
    catch(error){
        result("Error",null);
        res.status(500).json({message: error});
    }
    finally{
        await gateway.disconnect();
    } 
}

Dottore.followPatient = async( data,result ) => {
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:addPatient",JSON.stringify(data))) ).toString());
        
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
    catch(error){
        result("Error",null);
        res.status(500).json({message: error});
    }
    finally{
        await gateway.disconnect();
    } 
}


Dottore.unfollowPatient = async( data,result ) => {
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:unfollowPatient",JSON.stringify(data))) ).toString());
        
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
    catch(error){
        result("Error",null);
        
    }
    finally{
        await gateway.disconnect();
    } 
}





module.exports = Dottore;