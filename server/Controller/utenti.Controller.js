const Utente = require('../Model/utenti.Model');
const salt = require('../function/function');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.add_user=(req , res)=>{
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    const utente = new Utente({
        username : req.body.username,
        password : req.body.password,
        role : req.body.role,
        salt : salt.salt(30)
    });

    utente.add_user(utente , (err , data)=>{
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else { res.status(200).json( {message:data} ) }
    })

}


exports.userLogout= (req,res)=>{
    
    const cookies=req.cookies;
    const token = cookies.jwt; 
    const utente = {};

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            utente.username = decoded.username;
            utente.role = decoded.role;
        }
    );

    Utente.getToken(utente,(err,result) => {
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else if(result.length > 0){
            Utente.removeToken(utente,async(err,result) => {
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
    

/*
exports.user_login=(req , res)=>{
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    if( !req.body.username || !req.body.password ){
        res.status(400).send({message : "Errore durante l'operazione"});     
    }

    const utente = {
        username : req.body.username,
        password : req.body.password,
        role : req.body.role[0],
    }

    Utente.get_user(utente , (err , result)=>{
        if(err){
            res.status(400).send({message:err || "Qualcosa è andato storto"});
        }
        else { 
            const accessToken = jwt.sign(
                
                    {
                    "username":result[0].username,
                    "role":result[0].role,
                    "id":result[0].Id
                    },
                process.env.ACCESS_TOKEN,
                {expiresIn:"1200s"}
            );

                const refresh_token = jwt.sign(
                    {
                    "username":result[0].username,
                    "role":result[0].role,
                    "id":result[0].Id
                    },
                    process.env.REFRESH_TOKEN,
                    { expiresIn:"1d" }
                );

                Utente.addToken( { username:result[0].username,id:result[0].Id,refresh_token:refresh_token } ,(err) => {
                    if(err){
                        res.status(400).send({message:err|| "Qualcosa è andato storto"});
                    }
                    else {
                        res.cookie('jwt',refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                        res.status(200).json({accessToken,id:result[0].Id});
                    }
                })
                        
            //res.status(200).json( {message:data} );
        }
    })

}
*/

exports.user_login = (req,res) =>{
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
          role : req.body.role[0],

      }
  
      Utente.get_user(utente , (err , result)=>{
        if(err){
            res.status(500).send({message:err|| "Qualcosa è andato storto"});
        }
  
        else {
          key = "uid-"+result[0].email;
          let uid = req.cookies[key];
          let data = {uid:uid,email:result[0].email}

          if( uid!==undefined ){
            Utente.check_device(data, ( err,result ) => {
              
              if(err){
                res.status(500).send({message:err|| "Qualcosa è andato storto"});
              }
              else{
                if(result.check_device){
                  Utente.send_token(data.email,(err,result) => {
                    if(err){
                      res.status(500).send({message:err|| "Qualcosa è andato storto"});
                    }
                    else{

                        let data_token = result; 

                        Utente.addToken( { username:utente.username,id:result.id,refresh_token:data_token.refresh_token } ,(err,result) => {
                            if(err){
                                res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                            }
                            else {
                            ////////////////////////////////////////////////
                                Utente.update_device_uid(data,(err,result) =>  {
                                if(err){
                                    //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                                    res.status(500).send({message:err || "Qualcosa è andato storto" });
                                }
                                else{
                                    let uid = result.uid;
                                    let uid_key = "uid-"+data.email;
                                    res.cookie('jwt',data_token.refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                                    res.cookie(uid_key,uid, {httponly:true, sameSite:"None",secure:true,expires: new Date(Date.now() + 30*24*60*60*1000 )});
                                    res.status(200).json({accessToken:data_token.accessToken,id:data_token.id});
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
                  Utente.send_device_code_check(utente.username,(err,result) => {
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
            Utente.send_device_code_check(utente.username,(err,result) => {
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
    Utente.verify_device_code(data,(err,result) =>{
      if(err){
        //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        res.status(500).send({message:err || "Qualcosa è andato storto" });
      }
      else{
        Utente.save_device(result,(err,result) =>{
          if(err){
            //res.status(500).send({message:err.message || "Qualcosa è andato storto"});
            res.status(500).send({message:err || "Qualcosa è andato storto" });
          }
          else{
            let uid = result.uid;
            let email = result.email;

            Utente.send_token(result.email,(err,result) => {
              if(err){
                res.status(500).send({message:err|| "Qualcosa è andato storto"});
              }
              else{
                let data = result; 
                Utente.addToken( { username:data.username,refresh_token:data.refresh_token,id : result.id} ,(err,result) => {
                  if(err){
                      console.log(err)
                      res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                  }
                  else {
                      
                      let uid_key = "uid-"+email;
                      res.cookie('jwt',data.refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                      res.cookie(uid_key,uid, {httponly:true, sameSite:"None",secure:true,expires: new Date(Date.now() + 30*24*60*60*1000 )});
                      res.status(200).json({accessToken:data.accessToken,id:data.Id,username:data.username});
                  }
              })
            }
           })
          }
        })
      }
    })
  }



exports.recoverAccount=(req,res)=>{
    if(!req.body){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    Utente.recoverAccount(req.body,(err,result)=>{
        if(err){
            res.status(400).send({message:err || "Qualcosa è andato storto"});    
        }
        else{
            res.status(200).send({message:result});
        }
    })
}   

exports.checkCode = (req,res) =>{
    if(!req.params.code || req.params.code.length<30){
        res.status(400).send({message : "Errore durante l'operazione"});
    }
    else{
        Utente.checkCode({code:req.params.code,type:req.params.type},(err,result)=>{
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
    Utente.resetPassword(req.body,(err,result)=>{
        if(err){
            res.status(400).send({message:err || "Qualcosa è andato storto"});    
        }
        else{
            res.status(200).send({message:result});
        }
    })
}