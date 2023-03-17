
const nodemailer = require('nodemailer');
const sql = require('../database/db');


exports.create_salt = (len) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let result = "";

    for( let i=0; i<len; i++ ){
        result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
    }

    return result;
}

exports.create_randstring = (len,table) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#_-+£&';
    let charactersLength = characters.length;
    let result;
    let ok = 0;

        result = "";
        for( let i=0; i<len; i++ ){
            result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
        }
        sql.query("SELECT * FROM user_activation WHERE randstring=?",[table,result],(err,res)=>{
            if(err){
                console.log(err)
                result="Errore";
                ok=1;

            }
            else if(res[0] != undefined){
                ok=1;
                return;
            }
            else{
                ok = 1;
            }
        })
    

    return result;
}

exports.send_mail=(obj)=>{
    let result = "OK";
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
           auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS_MAIL,
             },
        secure: true,
        });

    const mailData = {from: process.env.EMAIL,  // sender address
        to: obj.to,   // list of receivers
        subject: obj.subject,
        text: obj.text,
        html: obj.html
      };
    transporter.sendMail(mailData, (err, info)=>{
        if(err){
          console.log(err);
          result= "Errore durante l'operazione";
        }
        else {
            result= "OK";
        }
    })
    return result;
}