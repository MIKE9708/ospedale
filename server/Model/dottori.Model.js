const { Gateway } = require("fabric-network");

const Dottore = () => {

}

Dottore.get_info = async(id , result,contract ) => {
    
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:get",id) ).toString()))
        if( res.status === "error" ){
            result( "Errore" , null );
            await gateway.disconect();
            return;
        }
        else {
            result( null , res );
            await gateway.disconect();
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

Dottore.get_patient_record = async( id,result,contract ) => {
    
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:getMyPatientsRecord",id)) ).toString());
        if( res.status === "error" ){
            result( "Error",null );
            await gateway.disconect();
            return ;
        }
        else{
            result( null,res );
            await gateway.disconect();
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

Dottore.add_patient_record = async( record,result,contract ) => { 

    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:addRecord",JSON.stringify(record))) ).toString());
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
    catch(error){
        result("Error",null);
        res.status(500).json({message: error});
    }
    finally{
        await gateway.disconnect();
    } 
}


Dottore.delete_patient_record = async( recordId,result,contract ) => {

    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:deleteRecord",recordId)) ).toString());
        if( res.status === "error" ){
            result( "Errore",null );
            await gateway.disconect();
            return;
        }
        else{
            result( null,res );
            await gateway.disconect();
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

Dottore.update_patient_record = async( record,result,contract ) => {

    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:addRecord",JSON.stringify(record))) ).toString());
        if( res.status==="error" ){
            result( "Errore",null );
            await gateway.disconect();
            return;
        }
        else{
            result( null,res );
            await gateway.disconect();
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


Dottore.getFreePatients = async( result,contract ) => {
    
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:getFreePatient")) ).toString());
        if( res.status==="error" ){
            result( "Errore",null );
            await gateway.disconect();
            return;
        }
        else{
            result( null,res );
            await gateway.disconect();
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

Dottore.followPatient = async( data,result,contract ) => {
    
    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("doctor:addPatient",JSON.stringify(data))) ).toString());
        
        if( res.status==="error" ){
            result( "Errore",null );
            await gateway.disconect();
            return;
        }
        else{
            result( null,res );
            await gateway.disconect();
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

