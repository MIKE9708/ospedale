

const Paziente = {

}


Paziente.showInfo = ( id , result ) => {
    let res = JSON.parse(Buffer.from(await contract.submitTransaction("patient:get",id)).toString())
    if( res.status == "error" ){
        result( "Errore" , null );
        return ;
    }
    else {
        result ( null , res );
    }

}