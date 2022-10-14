

const Record_model = () => {

}


Record_model.getRecord = async (recordId,result) => {
    let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:get",recordId))).toString())
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



