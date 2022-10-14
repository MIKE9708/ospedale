const { Gateway } = require("fabric-network");

const Dottore = () => {

}

Dottore.get_info = async(id , result) => {
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

Dottore.get_patient_record = async( id,result ) => {
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

Dottore.add_patient_record = async( record,result ) => { 
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


Dottore.delete_patient_record = async( recordId,result ) => {
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

Dottore.update_patient_record = async( record,result ) => {
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


Dottore.getFreePatients = async( result ) => {
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

Dottore.followPatient = async( data,result ) => {
    
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

