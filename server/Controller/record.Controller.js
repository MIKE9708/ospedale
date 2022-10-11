const Record_model = require('../Model/record.Model');


exports.getRecord = ( req,res ) => {
    Record_model.getRecord( req.params.id,( err,data ) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
            }
        else{
            res.status(200).json( {message:data} ) 
            }
    })
}