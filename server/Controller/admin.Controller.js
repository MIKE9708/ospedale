const Admin = require('../Model/admin.Model');




exports.deleteUser = async( req,result ) => {
    let res=await Admin.deleteUser_from_blockchain( req.body , (err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    } );

}


exports.addUser_to_blockchain = async( req,result ) => {

    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    let res = await Admin.addUser_to_blockchain( req.body,(err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    })
}


exports.listDoctor_from_blockchain = async( req,result ) => {

    let res = await Admin.listDoctor_from_blockchain( (err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    })

}


exports.listPatient_from_blockchain = async( req,result ) => {

    let res = await Admin.listPatient_from_blockchain( (err,data) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            res.status(200).json( {message:data} ) 
        }
    })
}



