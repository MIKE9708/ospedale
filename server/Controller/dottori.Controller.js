const Dottore = require('../Model/dottori.Model');


exports.get_info = ( req,res ) => {
    Dottore.get_info( req.params.id,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
            }
        else{
            res.status(200).json( {message:data} ) 
            }
        } 
    )
}

exports.get_patients_record = ( req,res ) => {
    Dottore.get_patiens_record( req.params.id,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else{
            res.status(200).json( {message:data} );
        }
    } ) 
}

exports.add_patient_record = ( req,res ) => {
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    Dottore.add_patient_record( req.body,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"}); 
        }
        else{
            res.status(200).json( {message:data} );
        }
    })
}


exports.delete_patient_record = ( req,res ) => {
    Dottore.delete_patient_record( req.params.id,(err,data) => {
        if(err){
            res.status(500).send( {message : err.message || "Qualcosa è andato storto"} );
        }        
        else{
            res.status(200).json( {message:data} );
        }
    })
}

exports.update_patient_record = ( req,res ) => {
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    Dottore.update_patient_record( req.body,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"}); 
        }
        else{
            res.status(200).json( {message:data} );
        }
    } )

}

exports.addPatient = ( req,res ) => {
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    Dottore.addPatient( req.body,(err,data) => {
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