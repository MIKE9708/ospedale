

const Admin = require('../Model/admin.Model');
const Utente = require('../Model/utenti.Model');

exports.deleteUser = ( req,res ) => {
  Admin.deleteUser_from_blockchain (req.params,(err,data)=>{
    if(err){
        res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
    else{
        res.status(200).json( {message:data} );
        }
  });
};

exports.addUser = ( req,res ) =>{
  if(!req.body){
    res.status(400).send({message : "Errore durante l'operazione"});
  }
  Utente.add_user(req.body.user,(err,data)=>{
    if(err){
      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
    }
    else { res.status(200).json( {message:data} ) }
  });
  Admin.addUser_to_blockchain( req.body.user_data,(err,data)=>{
    if(err){
      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
    }
    else{
      res.status(200).json( {message:data} );
    }

  } ); 
};

exports.AddAdmin = (req,res) => {
  Admin.AddAdmin(req.body,(err,data)=>{
   if(err){
      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
    }
    else { res.status(200).json( {message:data} ) }

  })
}


exports.listPatients = (req.res) =>{
  Admin.listPatient_from_blockchain((err,data)=>{
    if(err){
      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      }
    else{
      res.status(200).json( {message:data} );
    }

  })
}

exports.listDoctors = (req.res)=>{
  Admin.listPatient_from_blockchain((err,data)=>{
    if(err){
      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      }
    else{
      res.status(200).json( {message:data} );
    }

  });
};
