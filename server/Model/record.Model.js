

const Record_model = () => {

}


Record_model.getRecord = (recordId,result) => {
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("record:get",recordId)).toString())
    if( res.status === "error" ){
        result( "Errore" , null );
        return;
    }
    else {
        result( null , res );
    }
}



