
const Admin = require('../Model/admin.Model');
const Utente = require('../Model/utenti.Model');
const jwt = require('jsonwebtoken');
const salt = require('../function/function');
const sql = require('../database/db');
const rand = require('../function/function');



// 1)########################OK#############################################################
exports.login = (req,res) =>{
  if(!req.body){
    res.status(400).send({message : "Errore durante l'operazione"});
  }
  if( !req.body.username || !req.body.password ){
    res.status(400).send({message : "Errore durante l'operazione"});
  }
  else{
    const utente = {
        username : req.body.username,
        password : req.body.password,
    }

    Admin.get_user(utente , (err , result)=>{
      if(err){
          res.status(500).send({message:err|| "Qualcosa è andato storto"});
      }

      else {
        key = "uid-"+result[0].email;
        let uid = req.cookies[key];
        let data = {uid:uid,email:result[0].email}

        if( uid!==undefined ){
          Admin.check_device(data, ( err,result ) => {
            
            if(err){
              res.status(500).send({message:err|| "Qualcosa è andato storto"});
            }
            else{
              if(result.check_device){
                Admin.send_token(result.email,(err,result) => {
                  if(err){
                    res.status(500).send({message:err|| "Qualcosa è andato storto"});
                  }
                  else{
                    let data_token = result; 
                    Admin.addToken( { username:data_token.username,refresh_token:data_token.refresh_token } ,(err,result) => {
                      if(err){
                          res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                      }
                      else {
                        ////////////////////////////////////////////////
                          Admin.update_device_uid(data,(err,result) =>  {
                            if(err){
                              //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                              res.status(500).send({message:err || "Qualcosa è andato storto" });
                            }
                            else{
                              let uid = result.uid;
                              let uid_key = "uid-"+data.email;
                              res.cookie('jwt',data.refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                              res.cookie(uid_key,uid, {httponly:true, sameSite:"None",secure:true,expires: new Date(Date.now() + 30*24*60*60*1000 )});
                              res.status(200).json({accessToken:data_token.accessToken,id:data_token.username});
                            }
                          })
                          ////////////////////////////////////////////////
                            /*let uid_key = "uid-"+data.email;
                            res.cookie('jwt',data.refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                            res.cookie(uid_key,uid, {httponly:true, sameSite:"None",secure:true,expires: new Date(Date.now() + 30*24*60*60*1000 )});
                            res.status(200).json({accessToken:data.accessToken,id:data.username});*/
                      }
                  })
                }
               })
                
              }
              
              else{
                Admin.send_device_code_check(utente.username,(err,result) => {
                  if(err){
                    // console.log(err)
                    res.status(500).send({message:err|| "Qualcosa è andato storto"});
                  }
                  else{
                    res.status(200).json({check_device:false});
                  }
              })
            }
            }

          })
        }
        else{
          Admin.send_device_code_check(utente.username,(err,result) => {
            if(err){
              // console.log(err)
              res.status(500).send({message:err|| "Qualcosa è andato storto"});
            }
            else{
              res.status(200).json({check_device:false});
            }
        })
      }
    }
  })
}
}


exports.save_device = async( req,res ) => {

  let data = {code:req.body.code,username:req.body.username};

////////////////////////////////////////////////
  Admin.verify_device_code(data,(err,result) =>{
    if(err){
      //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      res.status(500).send({message:err || "Qualcosa è andato storto" });
    }
    else{
      Admin.save_device(result,(err,result) =>{
        if(err){
          //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
          res.status(500).send({message:err || "Qualcosa è andato storto" });
        }
        else{
          let uid = result.uid;
          let email = result.email
          Admin.send_token(result.email,(err,result) => {
            if(err){
              res.status(500).send({message:err|| "Qualcosa è andato storto"});
            }
            else{
              let data = result; 
              Admin.addToken( { username:data.username,refresh_token:data.refresh_token } ,(err,result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                }
                else {
                    
                    let uid_key = "uid-"+email;
                    res.cookie('jwt',data.refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                    res.cookie(uid_key,uid, {httponly:true, sameSite:"None",secure:true,expires: new Date(Date.now() + 30*24*60*60*1000 )});
                    res.status(200).json({accessToken:data.accessToken,id:data.username});
                }
            })
          }
         })
        }
      })
    }
  })
////////////////////////////////////////////////



 /* Admin.save_device(data,(err,result) =>{
    if(err){
      //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      res.status(500).send({message:err || "Qualcosa è andato storto" });
    }
    else{
      let uid = result.uid;
      let email = result.email
      Admin.send_token(result.email,(err,result) => {
        if(err){
          res.status(500).send({message:err|| "Qualcosa è andato storto"});
        }
        else{
          let data = result; 
          Admin.addToken( { username:data.username,refresh_token:data.refresh_token } ,(err,result) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err.message || "Qualcosa è andato storto"});
            }
            else {
                let uid_key = "uid-"+email;
                res.cookie('jwt',data.refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                res.cookie(uid_key,uid, {httponly:true, sameSite:"None",secure:true,expires: new Date(Date.now() + 30*24*60*60*1000 )});
                res.status(200).json({accessToken:data.accessToken,id:data.username});
            }
        })
      }
     })
    }
  })*/

}




exports.handleAdminRefreshToken = async(req,res) => {

  const cookies = req.cookies;
  if(!cookies?.jwt){
      // console.log(req)
      return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  sql.query('select * from admin_token where token = ?',[refreshToken],(err,result) => {

      if(err){
          return res.sendStatus(500);
      }
      else if (result.length === 0){
          return res.sendStatus(403);
      }
      else {
          jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN,
              (err,decode) => {
                  if(err || result[0].username !== decode.username){
                      return res.sendStatus(403);
                  }
                  const role = decode.role;
                  const access_token = jwt.sign(
                          {
                          "username":result[0].username,
                            },
                      process.env.ACCESS_TOKEN,
                      {"expiresIn":'15m'}

                  );
                  res.status(200).json({role,access_token,username:result[0].username,id:decode.id});

              }
          )
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
      Admin.removeUser(req.body,(err,result)=>{
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


exports.add_patient_record = async( req,res ) => {
  if(!req.body){
      res.status(400).send({message : "Errore durante l'operazione"});
  }
  await Admin.add_patient_record( req.body,(err,data) => {
      if(err){
          res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      }
      else{
          res.status(200).json( {message:data} );
      }
  })
}

// 1)########################OK#############################################################
exports.addUser = ( req,res ) =>{
  console.log(req.body)
  if(!req.body || !req.body['user_data']){
    res.status(500).send({message:"Errore durante l'operazione"});
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
            console.log(data.id)
            req.body['user_data'].id = data.id
            console.log(req.body['user_data'])
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
  console.log(req.body)
  if(req.body.user.password !== req.body.user.repassword || req.body.user.username.length===0 || req.body.user.password.length===0 || req.body.user.email.length===0){
    res.status(500).json( {message:"Dati immessi non validi"} )
  }

  const utente = {
    email:req.body.user.email,
    username : req.body.user.username,
    password : req.body.user.password,
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

exports.adminLogout= (req,res)=>{

  const cookies=req.cookies;
  const token = cookies.jwt;
  const utente = {};

  jwt.verify(
      token,
      process.env.REFRESH_TOKEN,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
          utente.username = decoded.username;
      }
  );

  Admin.getToken(utente,(err,result) => {
      if(err){
          res.status(500).send({message:err.message || "Qualcosa è andato storto"});
      }
      else if(result.length > 0){
          Admin.removeToken(utente,async(err,_) => {
              if(err){
                  res.status(500).send({message:err.message || "Qualcosa è andato storto"});
              }
              else{
                  await gateway.disconnect();
                  return res.status(200)
              }
          })
      }

  })
}


