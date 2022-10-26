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
        salt : salt(20)
    });

    utente.add_user(utente , (err , data)=>{
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else { res.status(200).json( {message:data} ) }
    })

}

exports.user_login=(req , res)=>{
    
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
        role : req.body.role,
    }

    Utente.get_user(utente , (err , result)=>{
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else { 
            
            const accessToken = jwt.sign(
                
                    {
                    "username":result[0].username,
                    "role":result[0].role
                    },
                process.env.ACCESS_TOKEN,
                {expiresIn:"1200s"}
            );

            if(!persist){
                res.status(200).json({accessToken});
            }

            else{

                const refresh_token = jwt.sign(
                    {
                    "username":result[0].username,
                    "role":result[0].role
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
                        res.status(200).json({accessToken});
                    }
                })
            }            
            //res.status(200).json( {message:data} );
        }
    })

}