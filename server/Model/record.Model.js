

const Record_model = () => {

}


Record_model.getRecord = async (recordId,result) => {

    try{
        let res = JSON.parse(Buffer.from(await (contract.submitTransaction("record:get",recordId))).toString())
        if( res.status === "error" ){
            result( "Errore" , null );
            await gateway.disconnect();
            return;
        }
        else {
            result( null , res );
            await gateway.disconnect();
            return;
        }
    }
    catch(error){
        result("Error",null);
        await gateway.disconnect();
        //res.status(500).json({message: error});
    }
    finally{
        await gateway.disconnect();
    } 
}


module.exports = Record_model;
