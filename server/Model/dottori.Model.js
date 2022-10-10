const Dottore = () => {

}

Dottore.get_info = (id , result) => {
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:get",id)).toString())
    if( res.status === "error" ){
        result( "Errore" , null );
        return;
    }
    else {
        result( null , res );
    }
}

Dottore.get_patient_record = ( id,result ) => {
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:getMyPatientsRecord",id)).toString());
    if( res.status === "error" ){
        result( "Error",null );
        return ;
    }
    else{
        result( null,res );
    }

}

Dottore.add_patient_record = ( record,result ) => { 
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("record:addRecord",JSON.stringify(record))).toString());
    if( res.status === 'error' ){
        result( "Error",null );
        return;
    }
    else{
        result( null,res );
    }
}


Dottore.delete_patient_record = ( recordId,result ) => {
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("record:deleteRecord",recordId).toString()));
    if( res.status === "error" ){
        result( "Errore",null );
        return;
    }
    else{
        result( null,res );
    }
}

Dottore.update_patient_record = ( record,result ) => {
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("record:addRecord",JSON.stringify(record))).toString());
    if( res.status==="error" ){
        result( "Errore",null );
        return;
    }
    else{
        result( null,res );
    }

}


Dottore.getFreePatients = ( result ) => {
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("record:getFreePatient")).toString());
    if( res.status==="error" ){
        result( "Errore",null );
        return;
    }
    else{
        result( null,res );
    }
}

Dottore.followPatient = ( data,result ) => {
    
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("doctor:addPatient",JSON.stringify(data))).toString());
    
    if( res.status==="error" ){
        result( "Errore",null );
        return;
    }
    else{
        result( null,res );
    }
}

