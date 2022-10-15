const Admin = require('../Model/admin.Model');




exports.deleteUser = async( req,result ) => {
    let res=await Admin.deleteUser_from_blockchain( req.body , (err,data) => {
        if(err){
            result.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            result.status(200).json( {message:data} ) 
        }
    } ,contract);

}


exports.addUser_to_blockchain = async( req,result ) => {

    if(!req.body){
        result.status(400).send({message : "Errore durante l'operazione"});
    }
    let res = await Admin.addUser_to_blockchain( req.body,(err,data) => {
        if(err){
            result.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            result.status(200).json( {message:data} ) 
        }
    },contract)
}


exports.listDoctor_from_blockchain = async( req,result) => {

    let res = await Admin.listDoctor_from_blockchain( (err,data) => {
        if(err){
            result.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            result.status(200).json( {message:data} ) 
        }
    },contract)

}


exports.listPatient_from_blockchain = async( req,result ) => {
    let res = await Admin.listPatient_from_blockchain( (err,data) => {
        if(err){
            result.status(500).send({message:err.message || "Qualcosa è andato storto"});   
        }
        else{
            result.status(200).json( {message:data} ) 
        }
    },contract)
}



