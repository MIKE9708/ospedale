const Utente = require('../Model/utenti.Model');
const salt = require('../function/function');

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
    const utente = new Utente({
        username : req.body.username,
        password : req.body.password,
        role : req.body.role,
    })
    Utente.get_user(utente , (err , res)=>{
        if(err){
            res.status(500).send({message:err.message || "Qualcosa è andato storto"});
        }
        else { 
            res.status(200).json( {message:data} );
        }
    })

}