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
    })

    Utente.add_user(utente , (err , data)=>{
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
    else if( !req.body.username || !req.body.password ){
        res.status(400).send({message : "Errore durante l'operazione"});     
    }

    const utente = new Utente({
        username : req.body.username,
        password : req.body.password,
        role : req.body.role,
    })

    Utente.get_user(utente , (err , result)=>{
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else { 

            const accessToken = jwt.sign(
                {"UserInfo" : {
                    "username":result.username,
                    "role":result.role
                    }
                },
                process.env.ACCESS_TOKEN,
                {expires_in:'15m'}
            );
            
            const refresh_token = jwt.sign(
                {"username":result.username},
                process.env.REFRESH_TOKEN,
                { expires_in:"1d" }
            );

            Utente.addToken( { username:result.username,refresh_token:refresh_token } ,(err) => {
                if(err){
                    res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                }
                else {
                    res.cookie('jwt',refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                    res.status(200).json({accessToken});
                }
            })            
            //res.status(200).json( {message:data} );
        }
    })

}