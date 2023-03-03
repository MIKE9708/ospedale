
const Admin = require('../Model/admin.Model');
const Utente = require('../Model/utenti.Model');
const jwt = require('jsonwebtoken');
const salt = require('../function/function');

exports.login = (req,res) =>{
  if(!req.body){
    res.status(400).send({message : "Errore durante l'operazione"});
  }
  if( !req.body.username || !req.body.password ){
    res.status(400).send({message : "Errore durante l'operazione"});     
  }
  const persist = req.body.persist;

  const utente = {
      username : req.body.username,
      password : req.body.password,
  }

  Admin.get_user(utente , (err , result)=>{
    if(err){
        res.status(500).send({message:err|| "Qualcosa è andato storto"});
    }
    else { 
        const accessToken = jwt.sign(
            
                {
                "username":result[0].username,
                },
            process.env.ACCESS_TOKEN,
            {expiresIn:"1200s"}
        );

        if(!persist){
            res.status(200).json( { accessToken,id:result[0].Id } );
        }

        else{

            const refresh_token = jwt.sign(
                {
                "username":result[0].username,
                },
                process.env.REFRESH_TOKEN,
                { expiresIn:"1d" }
            );

            Utente.addToken( { username:result[0].username,refresh_token:refresh_token } ,(err) => {
                if(err){
                    res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                }
                else {
                    res.cookie('jwt',refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                    res.status(200).json({accessToken,id:result[0].username});
                }
            })
        }            
        //res.status(200).json( {message:data} );
    }
})
}

exports.deleteUser = ( req,res ) => {

  error = ""
  Utente.removeToken(req.params,async(err,res) => {
    if(err){
        //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        error = err|| "Qualcosa è andato storto"
    }
  })

  Admin.deleteUserAccount(req.params.username,(err,res)=>{
    if(err){
      error = err|| "Qualcosa è andato storto"
    }
  })
  if(error.length == 0){
    Admin.deleteUser_from_blockchain (req.params,(err,data)=>{
      if(err){
          res.status(500).send({message:err || "Qualcosa è andato storto"});
          }
      else{
          res.status(200).json( {message:data} );
          }
    });
  }
  else{
    res.status(500).send({message:error});

  }
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

  const utente = {
    username : req.body.username,
    password : req.body.password,
    salt:salt.create_salt(20)
  }

  Admin.addAdmin(utente,(err,data)=>{
   if(err){
      res.status(500).send({message:err || "Qualcosa è andato storto"});
    }
    else { res.status(200).json( {message:data} ) }

  })
}


exports.listPatients = (req,res)=>{
  Admin.listPatient_from_blockchain((err,data) => {
    if(err){
      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      }
    else{
      res.status(200).json( {message:data} );
    }

  })
}

exports.listDoctors = (req,res)=>{
  Admin.listDoctor_from_blockchain((err,data)=>{
    if(err){
      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      }
    else{
      res.status(200).json( {message:data} );
    }

  });
}

