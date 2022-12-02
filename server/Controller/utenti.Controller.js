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
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refresh_token=cookies.jwt;
    let query="Select * FROM token WHERE token=?";
    let params=[refresh_token];
    db.get(query,params,(err,row)=>{
        if(err){
            return res.status(400).json({"error":err.message});
        }
        else if(!row){
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }
        query="DELETE FROM token WHERE token_data=?";
        params=[refresh_token];
        db.run(query,(err,row)=>{
            if(err){
                return res.status(400).json({"error":err.message});
            }
            else{
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                res.sendStatus(204);
            }
        })

    })*/


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
        role : req.body.role[0],
    }

    Utente.get_user(utente , (err , result)=>{
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
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

            if(!persist){
                res.status(200).json( { accessToken,id:result[0].Id } );
            }

            else{

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
                        res.status(500).send({message:err.message || "Qualcosa è andato storto"});
                    }
                    else {
                        res.cookie('jwt',refresh_token, {httponly:true, sameSite:"None",secure:true,maxAge:24 * 60 * 60 * 1000});
                        res.status(200).json({accessToken,id:result[0].Id});
                    }
                })
            }            
            //res.status(200).json( {message:data} );
        }
    })

}