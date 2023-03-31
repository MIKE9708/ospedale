
const Admin = require('../Model/admin.Model');
const Utente = require('../Model/utenti.Model');
const jwt = require('jsonwebtoken');
const salt = require('../function/function');

// 1)########################OK#############################################################
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
    }
})
}

exports.deleteUser = ( req,res ) => {

  error = ""
  Utente.removeToken(req.body,async(err,result) => {
    if(err){
        //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        res.status(500).send({message:err || "Qualcosa è andato storto" });
    }
    else{
      Admin.removeUser(req.body.id,(err,result)=>{
        if(err){
          res.status(500).send({message:err || "Qualcosa è andato storto" });

        }
        else{
          Admin.deleteUser_from_blockchain (req.body,(err,data)=>{
            if(err){
                res.status(500).send({message:err || "Qualcosa è andato storto"});
                }
            else{
                res.status(200).json( {message:data} );
                }
          });
        }
      })
    }
  })
};

// 1)########################OK#############################################################
exports.addUser = ( req,res ) =>{

  if(!req.body || !req.body['user_data']){
    res.status(500).send({message:error});
  }
  else{
    Admin.validateData(req.body['user_data'],(err,data)=>{
      if(err){
        res.status(500).send({message:err || "Qualcosa è andato storto" });
      }
      else{
        Utente.add_user(req.body.user,(err,data)=>{
          if(err){
            res.status(500).send({message:err});
          }
          else{
            req.body['user_data'].id = data.id 
            Admin.addUser_to_blockchain( req.body['user_data'],(err,data)=>{
              if(err ){
                res.status(500).send({message:err || "Qualcosa è andato storto" });
              }
              else{
                res.status(200).json( {message:data} );
              }
            }); 
          }
        });

      }
    })
  }
};

// 1)########################OK#############################################################
exports.AddAdmin = (req,res) => {

  if(req.body.password!==req.body.repassword || req.body.username.length===0 || req.body.password.length===0 || req.body.email.length===0){
    res.status(200).json( {message:"Dati immessi non validi"} )
  }

  const utente = {
    email:req.body.email,
    username : req.body.username,
    password : req.body.password,

    salt:salt.create_salt(30)
  }

  Admin.addAdmin(utente,(err,data)=>{
   if(err){
      res.status(500).send({message:err || "Qualcosa è andato storto"});
    }
    else { res.status(200).json( {message:data} ) }

  })
}

exports.ActivateAdminAccount = (req,res) => {
  Admin.activate_account(req.body.randstring,(err,data)=>{
    if(err){
      res.status(500).send({message:err || "Qualcosa è andato storto"});
    }
    else { res.status(200).json( {message:data} ) };
  })
}

exports.recoverAccount=(req,res)=>{
  if(!req.body){
      res.status(400).send({message : "Errore durante l'operazione"});
  }
  Admin.recover_account(req.body.email,(err,result)=>{
      if(err){
          res.status(400).send({message:err || "Qualcosa è andato storto"});    
      }
      else{
          res.status(200).send({message:result});
      }
  })
} 

exports.checkCode=(req,res)=>{
  if(!req.params.code || req.params.code.length<30){
      res.status(400).send({message : "Errore durante l'operazione"});
  }
  else{
      Admin.checkCode(req.params.code,(err,result)=>{
          if(err){
              res.status(400).send({message:err || "Qualcosa è andato storto"});    
          }
          else{
              res.status(200).send({message:"OK"});
          }
      })
  }
}

exports.resetPassword = (req,res) => {

  if(!req.body){
      res.status(400).send({message : "Errore durante l'operazione"});
  }
  Admin.resetPassword(req.body,(err,result)=>{
      if(err){
          res.status(400).send({message:err || "Qualcosa è andato storto"});    
      }
      else{
          res.status(200).send({message:result});
      }
  })
}
// 1)########################OK#############################################################
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
// 1)########################OK#############################################################
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

