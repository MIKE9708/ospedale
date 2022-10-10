const Admin = require('../Model/admin.Model');




exports.deleteUser = ( req,result ) => {
    let res=Admin.deleteUser_from_blockchain( req.body , (err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    } );

}


exports.addUser_to_blockchain = ( req,result ) => {

    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    let res = Admin.addUser_to_blockchain( req.body,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    })
}


exports.listDoctor_from_blockchain = ( req,result ) => {

    let res = Admin.listDoctor_from_blockchain( (err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    })

}


exports.listPatient_from_blockchain = ( req,result ) => {

    let res = Admin.listPatient_from_blockchain( (err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    })
}



