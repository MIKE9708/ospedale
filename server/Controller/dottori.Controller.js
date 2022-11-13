const Dottore = require('../Model/dottori.Model');


exports.get_info = async( req,res ) => {
    await Dottore.get_info( req.params.id,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
            }
        else{
            res.status(200).json( {message:data} ) 
            }
        } 
    )
}

exports.get_patients_record = async( req,res ) => {

    await Dottore.get_patient_record( req.params.id,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else{
            res.status(200).json( {message:data} );
        }
    } ) 
}

exports.add_patient_record = async( req,res ) => {
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    await Dottore.add_patient_record( req.body,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"}); 
        }
        else{
            res.status(200).json( {message:data} );
        }
    })
}


exports.delete_patient_record = async( req,res ) => {
   await Dottore.delete_patient_record( req.params.id,(err,data) => {
        if(err){
            res.status(500).send( {message : err.message || "Qualcosa è andato storto"} );
        }        
        else{
            res.status(200).json( {message:data} );
        }
    } , contract );
}

exports.update_patient_record = async( req,res ) => {
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    await Dottore.update_patient_record( req.body,(err,data,contract) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"}); 
        }
        else{
            res.status(200).json( {message:data} );
        }
    } )

}

exports.followPatient = async( req,res ) => {
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    await Dottore.followPatient( req.body,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"}); 
        }
        else{
            res.status(200).json( {message:data} );
        }
    } )
}


exports.getFreePatients = async( req,res ) => {

    await Dottore.getFreePatients( (err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"}); 
        }
        else{
            res.status(200).json( {message:data} );
        }
    } )
}


/*
exports.getAllPatients = ( req,res ) => {
    Dottore.getAllPatients( ( err,data ) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"}); 
        }
        else{
            res.status(200).json( {message:data} );
        } 
    } )
}
*/