const Record_model = require('../Model/record.Model');


exports.getRecord = async( req,res ) => {
    await Record_model.getRecord( req.id,( err,data ) => {
        
        if(err){
            res.status(500).json({message:err.message || "Qualcosa è andato storto"});
            }
        else{
            res.status(200).json( {message:data} ) 
            }
    })
}