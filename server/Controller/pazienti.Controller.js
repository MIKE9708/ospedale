const Paziente = require('../Model/pazienti.Model');


exports.info_paziente = (req , res)=>{
    const paziente = new Paziente;
    paziente.showInfo( req.params.id , ( err , data )=> {
        if( err ){
            res.status(500).send( {message:err || "Qualcosa è andato storto"} );
        }
        else {
            res.status( 200 ).json( {message : data} );
        }
    })
}